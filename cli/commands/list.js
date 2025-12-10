const chalk = require('chalk');
const ora = require('ora');
const { fetchCatalog } = require('../config/catalog-fetcher');
const { version } = require('../package.json');

/**
 * List command - displays available blocks, components, and themes
 * Usage: grg list [category] [--json]
 */
async function list(category, options = {}) {
  // Fetch catalog dynamically
  const spinner = options.json ? null : ora('Fetching catalog...').start();
  const RESOURCES = await fetchCatalog({ silent: true });
  if (spinner) spinner.stop();

  // JSON output for MCP server integration
  if (options.json) {
    const output = {
      cli: {
        name: 'grg',
        version,
        commands: {
          init: { usage: 'grg init [--theme <name>]', themeFlag: '--theme' },
          addBlock: { usage: 'grg add block <blockName> [fileIds...]', validBlocks: RESOURCES.blocks.map(b => b.name) },
          addComponent: { usage: 'grg add component <componentName>', validComponents: RESOURCES.components.map(c => c.name) },
          addTheme: { usage: 'grg add theme <themeName>' },
          list: { usage: 'grg list [category] [--json]' }
        }
      },
      themes: RESOURCES.themes,
      components: RESOURCES.components,
      blocks: RESOURCES.blocks
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  if (!category) {
    // Show overview
    console.log(chalk.bold.cyan('\n📦 GRG Kit Resources\n'));
    
    console.log(chalk.bold('Blocks') + chalk.gray(` (${RESOURCES.blocks.length} available)`));
    console.log(chalk.gray('  Add with: grg add block <name>'));
    console.log(chalk.gray('  Run: grg list blocks\n'));
    
    console.log(chalk.bold('Components') + chalk.gray(` (${RESOURCES.components.length} available)`));
    console.log(chalk.gray('  Add with: grg add component <name>'));
    console.log(chalk.gray('  Run: grg list components\n'));
    
    console.log(chalk.bold('Themes') + chalk.gray(` (${RESOURCES.themes.length} available)`));
    console.log(chalk.gray('  Add with: grg add theme <name>'));
    console.log(chalk.gray('  Run: grg list themes\n'));
    
    return;
  }

  switch (category) {
    case 'blocks':
      console.log(chalk.bold.cyan('\n🧱 Available Blocks\n'));
      RESOURCES.blocks.forEach(block => {
        console.log(chalk.bold(`  ${block.name}`));
        console.log(chalk.gray(`    ${block.description}`));
        console.log(chalk.yellow(`    grg add block ${block.name}`));
        if (block.files && block.files.length > 0) {
          console.log(chalk.gray(`    Files: ${block.files.map(f => f.id).join(', ')}`));
        }
        if (block.tags && block.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${block.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'components':
      console.log(chalk.bold.cyan('\n🧩 Available Components\n'));
      console.log(chalk.gray('  Use with: grg add component <name>\n'));
      RESOURCES.components.forEach(component => {
        console.log(chalk.bold(`  ${component.name}`));
        console.log(chalk.gray(`    ${component.description}`));
        console.log(chalk.yellow(`    grg add component ${component.name}`));
        if (component.dependencies && component.dependencies.length > 0) {
          console.log(chalk.gray(`    Dependencies: ${component.dependencies.join(', ')}`));
        }
        if (component.tags && component.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${component.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'themes':
      console.log(chalk.bold.cyan('\n🎨 Available Themes\n'));
      console.log(chalk.gray('  Use with: grg add theme <name>\n'));
      RESOURCES.themes.forEach(theme => {
        console.log(chalk.bold(`  ${theme.name}`));
        console.log(chalk.gray(`    ${theme.description}`));
        console.log(chalk.yellow(`    grg add theme ${theme.name}`));
        if (theme.tags && theme.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${theme.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    default:
      console.error(chalk.red(`Error: Unknown category "${category}"`));
      console.log(chalk.yellow('Valid categories: blocks, components, themes'));
      process.exit(1);
  }
}

module.exports = { list };
