/**
 * CLI Metadata - Single source of truth for CLI commands
 * Used by both CLI and MCP server
 */

const CLI_METADATA = {
  name: 'grg',
  version: '0.6.2',
  description: 'GRG Kit CLI - Initialize your Angular project with GRG Kit components and add blocks',
  
  commands: {
    init: {
      name: 'init',
      description: 'Initialize GRG Kit in current Angular project: installs Tailwind CSS v4, Spartan-NG, theme, and examples',
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
        { command: 'grg init', description: 'Initialize with default theme' },
        { command: 'grg init --theme claude', description: 'Initialize with Claude theme' }
      ]
    },
    
    addBlock: {
      name: 'add block',
      description: 'Add blocks to your project',
      usage: 'grg add block <blockName> [fileIds...]',
      options: [
        { flag: '--all', description: 'Add all blocks' },
        { flag: '-o, --output <path>', description: 'Custom output directory' }
      ],
      blocks: ['auth', 'shell', 'settings'],
      examples: [
        { command: 'grg add block auth', description: 'Add all auth files' },
        { command: 'grg add block auth login', description: 'Add only login file' },
        { command: 'grg add block auth login register', description: 'Add login and register files' },
        { command: 'grg add block shell sidebar', description: 'Add sidebar shell layout' },
        { command: 'grg add block --all', description: 'Add all blocks' }
      ]
    },
    
    list: {
      name: 'list',
      description: 'List available blocks and components',
      usage: 'grg list [category]',
      categories: ['blocks', 'themes', 'components'],
      examples: [
        { command: 'grg list', description: 'List all resources' },
        { command: 'grg list blocks', description: 'List available blocks' }
      ]
    }
  },
  
  // Helper to generate install command for a block
  getBlockInstallCommand: (blockName, fileIds = []) => {
    const files = fileIds.length > 0 ? ` ${fileIds.join(' ')}` : '';
    return `grg add block ${blockName}${files}`;
  },
  
  // Helper to generate init command with theme
  getInitCommand: (themeName) => {
    return themeName ? `grg init --theme ${themeName}` : 'grg init';
  }
};

module.exports = { CLI_METADATA };
