const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES, REPO } = require('../config/resources');

/**
 * Add command - downloads a specific resource
 * Format: grg add <category>:<name>
 * Examples:
 *   grg add theme:claude
 *   grg add component:stepper
 *   grg add examples:button
 *   grg add examples:all
 */
async function add(resource, options) {
  const [category, name] = resource.split(':');

  if (!category || !name) {
    console.error(chalk.red('Error: Invalid resource format. Use <category>:<name>'));
    console.log(chalk.yellow('Examples:'));
    console.log('  grg add theme:claude');
    console.log('  grg add component:stepper');
    console.log('  grg add examples:button');
    console.log('  grg add examples:all');
    process.exit(1);
  }

  let resourceData;
  let sourcePath;
  let outputPath;

  // Find the resource
  switch (category) {
    case 'theme':
      resourceData = RESOURCES.themes.find(t => t.name === name);
      if (resourceData) {
        sourcePath = resourceData.path;
        outputPath = options.output || resourceData.defaultOutput;
      }
      break;

    case 'component':
      resourceData = RESOURCES.components.find(c => c.name === name);
      if (resourceData) {
        sourcePath = resourceData.path;
        outputPath = options.output || resourceData.defaultOutput;
      }
      break;

    case 'layout':
      resourceData = RESOURCES.layouts.find(l => l.name === name);
      if (resourceData) {
        sourcePath = resourceData.path;
        outputPath = options.output || resourceData.defaultOutput;
      }
      break;

    case 'examples':
      if (name === 'all') {
        resourceData = RESOURCES.examples.all;
        sourcePath = resourceData.path;
        outputPath = options.output || resourceData.defaultOutput;
      } else {
        resourceData = RESOURCES.examples.components.find(e => e.name === name);
        if (resourceData) {
          sourcePath = resourceData.path;
          outputPath = options.output || resourceData.defaultOutput;
        }
      }
      break;

    default:
      console.error(chalk.red(`Error: Unknown category "${category}"`));
      console.log(chalk.yellow('Valid categories: theme, component, layout, examples'));
      process.exit(1);
  }

  if (!resourceData) {
    console.error(chalk.red(`Error: Resource "${name}" not found in category "${category}"`));
    console.log(chalk.yellow(`\nRun ${chalk.cyan('grg list ' + category + 's')} to see available resources`));
    process.exit(1);
  }

  // Download the resource
  const spinner = ora(`Downloading ${resourceData.title}...`).start();

  try {
    const emitter = degit(`${REPO}/${sourcePath}`, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(outputPath);

    spinner.succeed(chalk.green(`✓ ${resourceData.title} added successfully!`));
    console.log(chalk.gray(`  Location: ${outputPath}`));
    
    if (resourceData.description) {
      console.log(chalk.gray(`  ${resourceData.description}`));
    }

    // Show next steps for themes
    if (category === 'theme') {
      console.log(chalk.yellow('\nNext steps:'));
      console.log(chalk.gray(`  1. Import the theme in your src/styles.css:`));
      console.log(chalk.cyan(`     @import './${outputPath.replace('src/', '')}';`));
    }

    // Show dependencies if any
    if (resourceData.dependencies && resourceData.dependencies.length > 0) {
      console.log(chalk.yellow('\nRequired dependencies:'));
      resourceData.dependencies.forEach(dep => {
        console.log(chalk.gray(`  - ${dep}`));
      });
    }

  } catch (error) {
    spinner.fail(chalk.red('Failed to download resource'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

module.exports = { add };
