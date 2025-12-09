#!/usr/bin/env node

const { Command } = require('commander');
const { add } = require('../commands/add');
const { list } = require('../commands/list');
const { init } = require('../commands/init');
const { llmPrompts } = require('../commands/llm-setup');
const { version } = require('../package.json');

const program = new Command();

program
  .name('grg')
  .description('GRG Kit CLI - Initialize your Angular project with GRG Kit components and add blocks')
  .version(version);

// Init command - sets up GRG Kit in existing Angular project
program
  .command('init')
  .description('Initialize GRG Kit in current Angular project: installs Tailwind CSS v4, Spartan-NG, theme, and examples')
  .option('-t, --theme <name>', 'Theme to install (grg-theme, claude, clean-slate, modern-minimal, amber-minimal, mocks)', 'grg-theme')
  .action(init);

// Add command with block and component subcommands
const addCommand = program.command('add').description('Add resources to your project');

addCommand
  .command('block [blockName] [fileIds...]')
  .description('Add blocks to your project (e.g., grg add block auth login)')
  .option('--all', 'Add all blocks')
  .option('-o, --output <path>', 'Custom output directory')
  .action(add);

addCommand
  .command('component [componentName]')
  .description('Add GRG components to your project (e.g., grg add component file-upload)')
  .option('--all', 'Add all components')
  .option('-o, --output <path>', 'Custom output directory')
  .action(async (componentName, options) => {
    const { addComponent } = require('../commands/add');
    await addComponent(componentName, options);
  });

// List command
program
  .command('list [category]')
  .description('List available blocks and components')
  .action(list);

// LLM Setup command
program
  .command('llm-setup')
  .description('Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.)')
  .option('-o, --output <path>', 'Output directory for rules', '.windsurf/rules')
  .action(llmPrompts);

program.parse();
