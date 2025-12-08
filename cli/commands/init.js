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
 * Init command - initializes GRG Kit in an existing Angular project
 * Installs Tailwind CSS v4, runs spartan-ng ui, downloads theme
 * 
 * Prerequisites: Must be run inside an existing Angular project directory
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

  // Check if we're in an Angular project
  const spinner = ora();
  spinner.start('Checking for Angular project...');
  try {
    await fs.access('angular.json');
    spinner.succeed(chalk.green('✓ Angular project detected'));
  } catch (error) {
    spinner.fail(chalk.red('Not an Angular project'));
    console.error(chalk.red('\nError: angular.json not found'));
    console.log(chalk.yellow('\nPlease run this command inside an existing Angular project:'));
    console.log(chalk.cyan('  ng new my-app --style=css'));
    console.log(chalk.cyan('  cd my-app'));
    console.log(chalk.cyan('  grg init'));
    process.exit(1);
  }

  console.log(chalk.bold.cyan('\n🚀 Initializing GRG Kit\n'));
  console.log(chalk.gray(`  Theme: ${theme.title}\n`));

  // Step 1: Install Tailwind CSS v4
  spinner.start('Installing Tailwind CSS v4...');
  try {
    await execAsync('pnpm install tailwindcss @tailwindcss/postcss postcss', { stdio: 'pipe' });
    spinner.succeed(chalk.green('✓ Tailwind CSS v4 installed'));
  } catch (error) {
    spinner.warn(chalk.yellow('Tailwind CSS installation skipped (may already be installed)'));
  }

  // Step 3: Create .postcssrc.json
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

  // Step 4: Install Spartan-NG CLI
  spinner.start('Installing Spartan-NG CLI...');
  try {
    await execAsync('pnpm install -D @spartan-ng/cli', { stdio: 'pipe' });
    spinner.succeed(chalk.green('✓ Spartan-NG CLI installed'));
  } catch (error) {
    spinner.warn(chalk.yellow('Spartan-NG CLI installation skipped'));
  }

  // Step 5: Create components.json config file
  spinner.start('Creating Spartan-NG configuration...');
  try {
    const componentsConfig = {
      componentsPath: 'libs/spartan-ui',
      importAlias: '@spartan-ng/helm'
    };
    await fs.writeFile('components.json', JSON.stringify(componentsConfig, null, 2) + '\n');
    spinner.succeed(chalk.green('✓ Created components.json'));
  } catch (error) {
    spinner.warn(chalk.yellow('Could not create components.json'));
  }

  // Step 6: Update tsconfig.json with paths for Spartan-NG
  spinner.start('Configuring TypeScript paths...');
  try {
    const tsconfigPath = 'tsconfig.json';
    let tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');
    
    // Strip comments from tsconfig (Angular generates tsconfig with comments)
    tsconfigContent = tsconfigContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*/g, '');          // Remove line comments
    
    const tsconfig = JSON.parse(tsconfigContent);
    
    // Add baseUrl and paths for @spartan-ng/helm
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.baseUrl = '.';
    tsconfig.compilerOptions.paths = {
      '@spartan-ng/helm/*': ['./libs/spartan-ui/*/src/index.ts']
    };
    
    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n');
    spinner.succeed(chalk.green('✓ Configured TypeScript paths'));
  } catch (error) {
    spinner.warn(chalk.yellow('Could not update tsconfig.json'));
    console.error(chalk.gray(error.message));
  }

  // Step 7: Run Spartan-NG UI generator (install all components)
  // The spartan CLI prompts for component selection - we send 'a' to select all, then Enter
  spinner.start('Installing all Spartan-NG UI components...');
  try {
    const { spawn } = require('child_process');
    await new Promise((resolve, reject) => {
      const child = spawn('pnpm', ['ng', 'g', '@spartan-ng/cli:ui'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
        // When we see the prompt, send 'a' to select all, then Enter
        if (output.includes('Choose which primitives')) {
          child.stdin.write('a');
          setTimeout(() => {
            child.stdin.write('\n');
          }, 100);
        }
      });

      child.stderr.on('data', (data) => {
        // Spartan CLI outputs progress to stderr
        const text = data.toString();
        if (text.includes('CREATE') || text.includes('UPDATE')) {
          // Show progress dots
          process.stdout.write('.');
        }
      });

      child.on('close', (code) => {
        console.log(); // New line after progress dots
        if (code === 0) resolve();
        else reject(new Error(`Process exited with code ${code}`));
      });
      child.on('error', reject);
    });
    spinner.succeed(chalk.green('✓ All Spartan-NG UI components installed'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to run Spartan-NG UI generator'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Step 8: Download Spartan-NG examples
  spinner.start('Downloading Spartan-NG examples...');
  try {
    const examplesEmitter = degit(`${REPO}/templates/spartan-examples`, {
      cache: false,
      force: true,
      verbose: false,
    });
    await examplesEmitter.clone('libs/examples');
    spinner.succeed(chalk.green('✓ Downloaded Spartan-NG examples to libs/examples'));
  } catch (error) {
    spinner.warn(chalk.yellow('Could not download Spartan-NG examples'));
    console.error(chalk.gray(error.message));
  }

  // Step 9: Create themes directory
  spinner.start('Creating themes directory...');
  try {
    await fs.mkdir('src/themes', { recursive: true });
    spinner.succeed(chalk.green('✓ Created themes directory'));
  } catch (error) {
    spinner.warn(chalk.yellow('Themes directory may already exist'));
  }

  // Step 10: Download theme
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

  // Step 11: Update styles.css
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
  console.log(chalk.gray('  Spartan-NG:'), chalk.cyan('All UI components in libs/spartan-ui'));
  console.log(chalk.gray('  Examples:'), chalk.cyan('56+ component examples in libs/examples'));
  console.log(chalk.gray('  Theme:'), chalk.cyan(theme.title));
  
  console.log(chalk.yellow('\nNext steps:'));
  console.log(chalk.gray('  1. Run'), chalk.cyan('grg llm-setup'), chalk.gray('to generate AI assistant rules'));
  console.log(chalk.gray('  2. Run'), chalk.cyan('grg list blocks'), chalk.gray('to see available blocks'));
  console.log(chalk.gray('  3. Add blocks with'), chalk.cyan('grg add block --auth'));
  console.log();

  // Explicitly exit to close any lingering handles (e.g., from degit)
  process.exit(0);
}

module.exports = { init };
