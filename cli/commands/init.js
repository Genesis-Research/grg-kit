const fs = require('fs').promises;
const path = require('path');
const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES, REPO } = require('../config/resources');

/**
 * Init command - initializes GRG Kit in the project
 * Creates themes directory and downloads a theme
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

  // Step 1: Create themes directory
  const spinner = ora('Creating themes directory...').start();
  try {
    await fs.mkdir('src/themes', { recursive: true });
    spinner.succeed(chalk.green('✓ Created src/themes directory'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create themes directory'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 2: Download theme
  spinner.start(`Downloading ${theme.title}...`);
  try {
    const emitter = degit(`${REPO}/${theme.path}`, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(theme.defaultOutput);
    spinner.succeed(chalk.green(`✓ Downloaded ${theme.title}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to download theme'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 3: Check and update styles.css
  spinner.start('Checking src/styles.css...');
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
      // Add required imports if not present
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
  console.log(chalk.gray('Theme installed:'), chalk.cyan(theme.title));
  console.log(chalk.gray('Description:'), theme.description);
  
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.gray('  1. Run'), chalk.cyan('grg list'), chalk.gray('to see available resources'));
  console.log(chalk.gray('  2. Add components with'), chalk.cyan('grg add component:<name>'));
  console.log(chalk.gray('  3. Add examples with'), chalk.cyan('grg add examples:all'));
  console.log();
}

module.exports = { init };
