const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const https = require('https');
const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES, REPO } = require('../config/resources');

const execAsync = promisify(exec);

/**
 * Download a file from a URL
 */
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

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

  // Step 1: Fresh install of packages
  spinner.start('Cleaning node_modules and reinstalling packages...');
  try {
    await execAsync('rm -rf node_modules && npm install');
    spinner.succeed(chalk.green('✓ Fresh package install complete'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to reinstall packages'));
    console.error(chalk.gray(error.message));
    process.exit(1);
  }

  // Step 2: Install Tailwind CSS v4
  spinner.start('Installing Tailwind CSS v4...');
  try {
    await execAsync('npm install tailwindcss @tailwindcss/postcss postcss --force');
    spinner.succeed(chalk.green('✓ Tailwind CSS v4 installed'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to install Tailwind CSS v4'));
    console.error(chalk.gray(error.message));
    process.exit(1);
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
    await execAsync('npm install -D @spartan-ng/cli');
    spinner.succeed(chalk.green('✓ Spartan-NG CLI installed'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to install Spartan-NG CLI'));
    console.error(chalk.gray(error.message));
    process.exit(1);
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
    // Be careful not to strip // inside strings (like URLs)
    tsconfigContent = tsconfigContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/^\s*\/\/.*/gm, '');     // Remove line comments (only at start of line after whitespace)
    
    // Remove trailing commas (common in tsconfig files)
    tsconfigContent = tsconfigContent
      .replace(/,(\s*[}\]])/g, '$1');
    
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
      // Use 'ng' directly (works with global @angular/cli) instead of 'npx ng'
      // Exit code 127 occurs when npx can't find the command
      const child = spawn('ng', ['g', '@spartan-ng/cli:ui'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true,
        env: { ...process.env }  // Inherit PATH to find global ng
      });

      let output = '';
      let promptHandled = false;

      // Handle stdin errors gracefully (EPIPE if process exits early)
      child.stdin.on('error', (err) => {
        if (err.code !== 'EPIPE') {
          console.error(chalk.gray(`stdin error: ${err.message}`));
        }
      });

      const safeWrite = (data) => {
        if (child.stdin.writable && !child.stdin.destroyed) {
          child.stdin.write(data);
        }
      };

      child.stdout.on('data', (data) => {
        output += data.toString();
        // When we see the prompt, send 'a' to select all, then Enter
        if (!promptHandled && output.includes('Choose which primitives')) {
          promptHandled = true;
          safeWrite('a');
          setTimeout(() => {
            safeWrite('\n');
          }, 100);
        }
      });

      let stderrOutput = '';
      child.stderr.on('data', (data) => {
        stderrOutput += data.toString();
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
        else reject(new Error(`Process exited with code ${code}${stderrOutput ? '\n' + stderrOutput : ''}`));
      });
      child.on('error', (err) => {
        if (err.code === 'ENOENT') {
          reject(new Error('Angular CLI (ng) not found. Please install it: npm install -g @angular/cli'));
        } else {
          reject(err);
        }
      });
    });
    spinner.succeed(chalk.green('✓ All Spartan-NG UI components installed'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to run Spartan-NG UI generator'));
    console.error(chalk.red(error.message));
    console.log(chalk.yellow('\nTroubleshooting:'));
    console.log(chalk.gray('  1. Ensure Angular CLI is installed:'), chalk.cyan('npm install -g @angular/cli'));
    console.log(chalk.gray('  2. Ensure @spartan-ng/cli is installed:'), chalk.cyan('npm install -D @spartan-ng/cli'));
    console.log(chalk.gray('  3. Try running manually:'), chalk.cyan('ng g @spartan-ng/cli:ui'));
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

  // Step 10: Download theme file
  spinner.start(`Downloading ${theme.title} theme...`);
  try {
    const themeUrl = `https://raw.githubusercontent.com/${REPO}/main/${theme.path}`;
    const themeContent = await downloadFile(themeUrl);
    await fs.writeFile(theme.defaultOutput, themeContent);
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
