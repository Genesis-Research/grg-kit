const chalk = require('chalk');
const { RESOURCES } = require('../config/resources');

/**
 * Metadata command - outputs structured information about all commands and resources
 * This is designed to be consumed by MCP servers and LLMs
 */
async function metadata(options) {
  const format = options.format || 'json';

  const commandMetadata = {
    version: '0.1.0',
    name: 'grg-kit-cli',
    description: 'CLI tool for pulling GRG Kit resources into Angular projects',
    repository: 'https://github.com/Genesis-Research/grg-kit',
    commands: [
      {
        name: 'init',
        description: 'Initialize GRG Kit in your Angular project with themes directory and configuration',
        usage: 'grg init [options]',
        options: [
          {
            flag: '-t, --theme <name>',
            description: 'Theme to install',
            default: 'grg-theme',
            choices: ['grg-theme', 'claude', 'clean-slate', 'modern-minimal', 'amber-minimal', 'mocks']
          }
        ],
        examples: [
          'grg init',
          'grg init --theme claude',
          'grg init -t modern-minimal'
        ],
        effects: [
          'Creates src/themes directory',
          'Downloads selected theme file',
          'Updates src/styles.css with theme import'
        ]
      },
      {
        name: 'add',
        description: 'Add a GRG Kit resource to your project',
        usage: 'grg add <resource> [options]',
        options: [
          {
            flag: '-o, --output <path>',
            description: 'Output directory for the resource',
            default: 'Auto-determined based on resource type'
          }
        ],
        examples: [
          'grg add theme:claude',
          'grg add component:stepper',
          'grg add layout:dashboard',
          'grg add examples:button',
          'grg add examples:all'
        ],
        resourceFormat: '<category>:<name>',
        categories: ['theme', 'component', 'layout', 'examples'],
        effects: [
          'Downloads the specified resource',
          'Places it in the appropriate directory'
        ]
      },
      {
        name: 'list',
        description: 'List available GRG Kit resources',
        usage: 'grg list [category]',
        examples: [
          'grg list',
          'grg list themes',
          'grg list components',
          'grg list layouts',
          'grg list examples'
        ],
        categories: ['themes', 'components', 'layouts', 'examples'],
        effects: [
          'Displays available resources in the specified category'
        ]
      },
      {
        name: 'metadata',
        description: 'Output structured metadata about all available commands and resources (for MCP servers)',
        usage: 'grg metadata [options]',
        options: [
          {
            flag: '-f, --format <type>',
            description: 'Output format',
            default: 'json',
            choices: ['json', 'yaml']
          }
        ],
        examples: [
          'grg metadata',
          'grg metadata --format json'
        ],
        effects: [
          'Outputs structured metadata in specified format'
        ]
      },
      {
        name: 'llm-prompts',
        description: 'Generate LLM-specific prompts and rules for AI assistants (Windsurf, Cursor, etc.)',
        usage: 'grg llm-prompts [options]',
        options: [
          {
            flag: '-o, --output <path>',
            description: 'Output directory for rules',
            default: '.windsurf/rules'
          }
        ],
        examples: [
          'grg llm-prompts',
          'grg llm-prompts --output .cursor/rules',
          'grg llm-prompts -o .ai-rules'
        ],
        effects: [
          'Creates output directory if it doesn\'t exist',
          'Generates design-system.md with GRG Kit design patterns',
          'Generates grg-kit-mcp.md with MCP server integration rules',
          'Configures AI assistants to use GRG Kit resources first'
        ],
        benefits: [
          'AI assistants will check GRG Kit resources before writing custom code',
          'Ensures consistent usage of Spartan-NG and GRG Kit components',
          'Provides AI with comprehensive design system knowledge',
          'Integrates with MCP server for automatic resource discovery'
        ]
      }
    ],
    resources: RESOURCES
  };

  if (format === 'json') {
    console.log(JSON.stringify(commandMetadata, null, 2));
  } else if (format === 'yaml') {
    // Simple YAML output (could use a library for more complex cases)
    console.log('# GRG Kit CLI Metadata');
    console.log(`version: ${commandMetadata.version}`);
    console.log(`name: ${commandMetadata.name}`);
    console.log(`description: ${commandMetadata.description}`);
    console.log('\ncommands:');
    commandMetadata.commands.forEach(cmd => {
      console.log(`  - name: ${cmd.name}`);
      console.log(`    description: ${cmd.description}`);
      console.log(`    usage: ${cmd.usage}`);
    });
  }
}

module.exports = { metadata };
