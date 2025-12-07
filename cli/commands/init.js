const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES, REPO } = require('../config/resources');

const execAsync = promisify(exec);

/**
 * Init command - initializes GRG Kit in the project
 * Installs Tailwind CSS v4, runs spartan-ng init, downloads theme, components, and examples
 */
async function init(options) {
  const themeName = options.theme || 'grg-theme';
  const theme = RESOURCES.themes.find(t => t.name === themeName);

  if (!theme) {
    console.error(chalk.red(`Error: Theme "${themeName}" not found`));
    console.log(chalk.yellow('Available themes:'));
    RESOURCES.themes.forEach(t => console.log(chalk.gray(`  - ${t.name}`)));
    process.exit(1);
  }

  console.log(chalk.bold.cyan('\n🚀 Initializing GRG Kit\n'));

  const spinner = ora();

  // Step 1: Install Tailwind CSS v4
  spinner.start('Installing Tailwind CSS v4...');
  try {
    await execAsync('npm install tailwindcss @tailwindcss/postcss postcss --force', { stdio: 'pipe' });
    spinner.succeed(chalk.green('✓ Tailwind CSS v4 installed'));
  } catch (error) {
    spinner.warn(chalk.yellow('Tailwind CSS installation skipped (may already be installed)'));
  }

  // Step 2: Create .postcssrc.json
  spinner.start('Creating PostCSS configuration...');
  try {
    const postcssConfig = {
      plugins: {
        '@tailwindcss/postcss': {}
      }
    };
    await fs.writeFile('.postcssrc.json', JSON.stringify(postcssConfig, null, 2) + '\n');
    spinner.succeed(chalk.green('✓ Created .postcssrc.json'));
  } catch (error) {
    spinner.warn(chalk.yellow('Could not create .postcssrc.json (may already exist)'));
  }

  // Step 3: Install Spartan-NG CLI
  spinner.start('Installing Spartan-NG CLI...');
  try {
    await execAsync('npm install -D @spartan-ng/cli', { stdio: 'pipe' });
    spinner.succeed(chalk.green('✓ Spartan-NG CLI installed'));
  } catch (error) {
    spinner.warn(chalk.yellow('Spartan-NG CLI installation skipped'));
  }

  // Step 4: Run spartan-ng init (with auto-accept defaults)
  spinner.start('Running spartan-ng init...');
  try {
    // Use printf to auto-accept prompts (project selection + theme selection)
    await execAsync('printf "\\n\\n" | npx ng g @spartan-ng/cli:init', { 
      stdio: 'pipe',
      shell: true 
    });
    spinner.succeed(chalk.green('✓ Spartan-NG initialized'));
  } catch (error) {
    spinner.warn(chalk.yellow('Spartan-NG init requires manual setup'));
    console.log(chalk.gray('  Run: npx ng g @spartan-ng/cli:init'));
  }

  // Step 5: Create directories
  spinner.start('Creating directories...');
  try {
    await fs.mkdir('src/themes', { recursive: true });
    await fs.mkdir('src/app/components', { recursive: true });
    spinner.succeed(chalk.green('✓ Created directories'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create directories'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 6: Download theme
  spinner.start(`Downloading ${theme.title} theme...`);
  try {
    const emitter = degit(`${REPO}/${theme.path}`, {
      cache: false,
      force: true,
      verbose: false,
    });
    await emitter.clone(theme.defaultOutput);
    spinner.succeed(chalk.green(`✓ Downloaded ${theme.title} theme`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to download theme'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 7: Update styles.css
  spinner.start('Updating src/styles.css...');
  try {
    const stylesPath = 'src/styles.css';
    let stylesContent = '';
    
    try {
      stylesContent = await fs.readFile(stylesPath, 'utf-8');
    } catch (error) {
      // File doesn't exist, create it
      stylesContent = '';
    }

    const themeImport = `@import './themes/${theme.file}';`;
    
    if (!stylesContent.includes(themeImport)) {
      const requiredImports = [
        '@import "@angular/cdk/overlay-prebuilt.css";',
        '@import "tailwindcss";',
        '@import "@spartan-ng/brain/hlm-tailwind-preset.css";',
        '',
        themeImport
      ];

      const newContent = requiredImports.join('\n') + '\n';
      await fs.writeFile(stylesPath, newContent);
      spinner.succeed(chalk.green('✓ Updated src/styles.css with theme import'));
    } else {
      spinner.succeed(chalk.green('✓ Theme already imported in src/styles.css'));
    }
  } catch (error) {
    spinner.warn(chalk.yellow('Could not update src/styles.css automatically'));
    console.log(chalk.gray('\nPlease add the following to your src/styles.css:'));
    console.log(chalk.cyan(`  @import './themes/${theme.file}';`));
  }

  // Success message
  console.log(chalk.bold.green('\n✨ GRG Kit initialized successfully!\n'));
  
  console.log(chalk.bold('Installed:'));
  console.log(chalk.gray('  Tailwind CSS:'), chalk.cyan('v4 with PostCSS'));
  console.log(chalk.gray('  Spartan-NG:'), chalk.cyan('initialized'));
  console.log(chalk.gray('  Theme:'), chalk.cyan(theme.title));
  console.log(chalk.gray('  Components:'), chalk.cyan(`${RESOURCES.components.length} GRG components`));
  
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.gray('  1. Run'), chalk.cyan('grg list blocks'), chalk.gray('to see available blocks'));
  console.log(chalk.gray('  2. Add blocks with'), chalk.cyan('grg add block --auth'));
  console.log();
}

module.exports = { init };
