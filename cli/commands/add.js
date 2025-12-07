const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const { RESOURCES, REPO } = require('../config/resources');

/**
 * Add command - downloads blocks
 * Format: grg add block [options]
 * Examples:
 *   grg add block --auth
 *   grg add block --shell --settings
 *   grg add block --all
 */
async function add(options) {
  // Determine which blocks to add
  const blocksToAdd = [];
  
  if (options.all) {
    blocksToAdd.push(...RESOURCES.blocks);
  } else {
    if (options.auth) {
      const block = RESOURCES.blocks.find(b => b.name === 'auth');
      if (block) blocksToAdd.push(block);
    }
    if (options.shell) {
      const block = RESOURCES.blocks.find(b => b.name === 'shell');
      if (block) blocksToAdd.push(block);
    }
    if (options.settings) {
      const block = RESOURCES.blocks.find(b => b.name === 'settings');
      if (block) blocksToAdd.push(block);
    }
  }

  if (blocksToAdd.length === 0) {
    console.log(chalk.yellow('\nNo blocks specified. Use one of the following options:\n'));
    console.log(chalk.cyan('  grg add block --all'), chalk.gray('       Add all blocks'));
    console.log(chalk.cyan('  grg add block --auth'), chalk.gray('      Add authentication block'));
    console.log(chalk.cyan('  grg add block --shell'), chalk.gray('     Add app shell block'));
    console.log(chalk.cyan('  grg add block --settings'), chalk.gray('  Add settings block'));
    console.log(chalk.gray('\nRun'), chalk.cyan('grg list blocks'), chalk.gray('for more details'));
    process.exit(1);
  }

  console.log(chalk.bold.cyan(`\n📦 Adding ${blocksToAdd.length} block(s)\n`));

  const spinner = ora();

  for (const block of blocksToAdd) {
    const outputPath = options.output 
      ? `${options.output}/${block.name}` 
      : block.defaultOutput;

    spinner.start(`Downloading ${block.title}...`);

    try {
      const emitter = degit(`${REPO}/${block.path}`, {
        cache: false,
        force: true,
        verbose: false,
      });

      await emitter.clone(outputPath);

      spinner.succeed(chalk.green(`✓ ${block.title} added`));
      console.log(chalk.gray(`  Location: ${outputPath}`));
      
      // Show dependencies if any
      if (block.dependencies && block.dependencies.length > 0) {
        console.log(chalk.gray(`  Dependencies: ${block.dependencies.join(', ')}`));
      }
      console.log();

    } catch (error) {
      spinner.fail(chalk.red(`Failed to download ${block.title}`));
      console.error(chalk.red(error.message));
    }
  }

  console.log(chalk.bold.green('✨ Done!'));
}

module.exports = { add };
