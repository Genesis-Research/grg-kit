#!/usr/bin/env node

const { Command } = require('commander');
const { add } = require('../commands/add');
const { list } = require('../commands/list');
const { init } = require('../commands/init');
const { llmPrompts } = require('../commands/llm-setup');

const program = new Command();

program
  .name('grg')
  .description('GRG Kit CLI - Initialize your Angular project with GRG Kit components and add blocks')
  .version('0.5.0');

// Init command - sets up everything in one shot
program
  .command('init <project-name>')
  .description('Initialize GRG Kit: creates Angular project with zoneless, sets up styles.css with theme, adds all components')
  .option('-t, --theme <name>', 'Theme to install (grg-theme, claude, clean-slate, modern-minimal, amber-minimal, mocks)', 'grg-theme')
  .action(init);

// Add command with block subcommand
const addCommand = program.command('add').description('Add resources to your project');

addCommand
  .command('block')
  .description('Add blocks to your project')
  .option('--all', 'Add all blocks')
  .option('--auth', 'Add authentication block (login, signup, forgot password)')
  .option('--shell', 'Add app shell block (sidebar, header, content area)')
  .option('--settings', 'Add settings block (settings page with sidebar navigation)')
  .option('-o, --output <path>', 'Custom output directory')
  .action(add);

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
