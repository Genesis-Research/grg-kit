const chalk = require('chalk');
const { RESOURCES } = require('../config/resources');

/**
 * List command - displays available resources
 * Usage: grg list [category]
 */
async function list(category) {
  if (!category) {
    // Show all categories
    console.log(chalk.bold.cyan('\n📦 GRG Kit Resources\n'));
    
    console.log(chalk.bold('Themes') + chalk.gray(` (${RESOURCES.themes.length} available)`));
    console.log(chalk.gray('  Run: grg list themes\n'));
    
    console.log(chalk.bold('Components') + chalk.gray(` (${RESOURCES.components.length} available)`));
    console.log(chalk.gray('  Run: grg list components\n'));
    
    console.log(chalk.bold('Layouts') + chalk.gray(` (${RESOURCES.layouts.length} available)`));
    console.log(chalk.gray('  Run: grg list layouts\n'));
    
    console.log(chalk.bold('Spartan-NG Examples') + chalk.gray(` (${RESOURCES.examples.components.length}+ available)`));
    console.log(chalk.gray('  Run: grg list examples\n'));
    
    return;
  }

  switch (category) {
    case 'themes':
      console.log(chalk.bold.cyan('\n🎨 Available Themes\n'));
      RESOURCES.themes.forEach(theme => {
        console.log(chalk.bold(`  ${theme.name}`));
        console.log(chalk.gray(`    ${theme.description}`));
        console.log(chalk.yellow(`    grg add theme:${theme.name}`));
        if (theme.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${theme.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'components':
      console.log(chalk.bold.cyan('\n🧩 Available Components\n'));
      RESOURCES.components.forEach(component => {
        console.log(chalk.bold(`  ${component.name}`));
        console.log(chalk.gray(`    ${component.description}`));
        console.log(chalk.yellow(`    grg add component:${component.name}`));
        if (component.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${component.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'layouts':
      console.log(chalk.bold.cyan('\n📐 Available Layouts\n'));
      RESOURCES.layouts.forEach(layout => {
        console.log(chalk.bold(`  ${layout.name}`));
        console.log(chalk.gray(`    ${layout.description}`));
        console.log(chalk.yellow(`    grg add layout:${layout.name}`));
        if (layout.tags.length > 0) {
          console.log(chalk.gray(`    Tags: ${layout.tags.join(', ')}`));
        }
        console.log();
      });
      break;

    case 'examples':
      console.log(chalk.bold.cyan('\n📚 Available Spartan-NG Examples\n'));
      
      // Show "all" option first
      console.log(chalk.bold(`  all`) + chalk.gray(' (recommended)'));
      console.log(chalk.gray(`    ${RESOURCES.examples.all.description}`));
      console.log(chalk.yellow(`    grg add examples:all`));
      console.log();
      
      console.log(chalk.gray('  Or add individual component examples:\n'));
      
      RESOURCES.examples.components.forEach(example => {
        console.log(chalk.bold(`  ${example.name}`));
        console.log(chalk.gray(`    ${example.description}`));
        console.log(chalk.yellow(`    grg add examples:${example.name}`));
        console.log();
      });
      break;

    default:
      console.error(chalk.red(`Error: Unknown category "${category}"`));
      console.log(chalk.yellow('Valid categories: themes, components, layouts, examples'));
      process.exit(1);
  }
}

module.exports = { list };
