const chalk = require('chalk');
const ora = require('ora');
const { fetchCatalog } = require('../config/catalog-fetcher');

/**
 * List command - displays available blocks and themes
 * Usage: grg list [category]
 */
async function list(category) {
  // Fetch catalog dynamically
  const spinner = ora('Fetching catalog...').start();
  const RESOURCES = await fetchCatalog({ silent: true });
  spinner.stop();

  if (!category) {
    // Show overview
    console.log(chalk.bold.cyan('\n📦 GRG Kit Resources\n'));
    
    console.log(chalk.bold('Blocks') + chalk.gray(` (${RESOURCES.blocks.length} available)`));
    console.log(chalk.gray('  Add with: grg add block --<name>'));
    console.log(chalk.gray('  Run: grg list blocks\n'));
    
    console.log(chalk.bold('Themes') + chalk.gray(` (${RESOURCES.themes.length} available)`));
    console.log(chalk.gray('  Set with: grg init --theme <name>'));
    console.log(chalk.gray('  Run: grg list themes\n'));
    
    console.log(chalk.gray('Components and spartan-ng examples are installed automatically with'), chalk.cyan('grg init'));
    console.log();
    
    return;
  }

  switch (category) {
    case 'blocks':
      console.log(chalk.bold.cyan('\n🧱 Available Blocks\n'));
      RESOURCES.blocks.forEach(block => {
        console.log(chalk.bold(`  ${block.name}`));
        console.log(chalk.gray(`    ${block.description}`));
        console.log(chalk.yellow(`    grg add block --${block.name}`));
        if (block.tags && block.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${block.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'themes':
      console.log(chalk.bold.cyan('\n🎨 Available Themes\n'));
      console.log(chalk.gray('  Use with: grg init --theme <name>\n'));
      RESOURCES.themes.forEach(theme => {
        console.log(chalk.bold(`  ${theme.name}`));
        console.log(chalk.gray(`    ${theme.description}`));
        console.log(chalk.yellow(`    grg init --theme ${theme.name}`));
        if (theme.tags && theme.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${theme.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    default:
      console.error(chalk.red(`Error: Unknown category "${category}"`));
      console.log(chalk.yellow('Valid categories: blocks, themes'));
      process.exit(1);
  }
}

module.exports = { list };
