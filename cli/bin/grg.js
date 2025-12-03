#!/usr/bin/env node

const { Command } = require('commander');
const { add } = require('../commands/add');
const { list } = require('../commands/list');
const { init } = require('../commands/init');
const { metadata } = require('../commands/metadata');
const { interactive } = require('../commands/interactive');
const { llmPrompts } = require('../commands/llm-prompts');

const program = new Command();

program
  .name('grg')
  .description('GRG Kit CLI - Pull themes, components, and examples into your Angular project')
  .version('0.1.2');

// Interactive command (default if no args)
program
  .command('interactive', { isDefault: false })
  .alias('i')
  .description('Interactive mode - browse and add resources with a guided interface')
  .action(interactive);

// Init command
program
  .command('init')
  .description('Initialize GRG Kit in your Angular project with themes directory and configuration')
  .option('-t, --theme <name>', 'Theme to install (grg-theme, claude, clean-slate, modern-minimal, amber-minimal, mocks)', 'grg-theme')
  .action(init);

// Add command
program
  .command('add <resource>')
  .description('Add a GRG Kit resource to your project')
  .option('-o, --output <path>', 'Output directory for the resource')
  .action(add);

// List command
program
  .command('list [category]')
  .description('List available GRG Kit resources (themes, components, layouts, examples)')
  .action(list);

// Metadata command (for MCP server integration)
program
  .command('metadata')
  .description('Output structured metadata about all available commands and resources (JSON format for MCP servers)')
  .option('-f, --format <type>', 'Output format (json, yaml)', 'json')
  .action(metadata);

// LLM Prompts command
program
  .command('llm-prompts')
  .description('Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.)')
  .option('-o, --output <path>', 'Output directory for rules', '.windsurf/rules')
  .action(llmPrompts);

// If no command provided, run interactive mode
if (process.argv.length === 2) {
  interactive();
} else {
  program.parse();
}
