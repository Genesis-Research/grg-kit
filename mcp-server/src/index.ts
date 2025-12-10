#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { fetchCatalog, type GRGResources, type CLIMetadata } from './catalog-fetcher.js';

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const VERSION = packageJson.version;

// Helper functions to generate CLI commands from metadata
function getBlockInstallCommand(cli: CLIMetadata | undefined, blockName: string, fileIds: string[] = []): string {
  const files = fileIds.length > 0 ? ` ${fileIds.join(' ')}` : '';
  return `grg add block ${blockName}${files}`;
}

function getThemeInstallCommand(cli: CLIMetadata | undefined, themeName: string): string {
  return `grg add theme ${themeName}`;
}

function getValidBlocks(cli: CLIMetadata | undefined): string[] {
  return cli?.commands.addBlock.validBlocks || ['auth', 'shell', 'settings'];
}

function getComponentInstallCommand(componentName: string): string {
  return `grg add component ${componentName}`;
}

// Get resources - uses cache or fetches dynamically
async function getResources(): Promise<GRGResources> {
  return await fetchCatalog();
}


const server = new Server(
  {
    name: 'grg-kit',
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'catalog',
        description: `Search, list, or get details for GRG Kit resources (themes, components, blocks). Each result includes the install command.

Usage:
- No params: List all resources
- query="login": Search for resources matching "login"
- name="auth": Get details for a specific resource
- category="blocks": Filter by category`,
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (e.g., "form", "dashboard", "sidebar")',
            },
            name: {
              type: 'string',
              description: 'Get details for a specific resource by name (e.g., "auth", "claude")',
            },
            category: {
              type: 'string',
              enum: ['all', 'themes', 'components', 'blocks'],
              description: 'Filter by category (default: all)',
            },
          },
        },
      },
      {
        name: 'install',
        description: `Get CLI command to install a GRG Kit resource. Returns command and post-install instructions.

Examples:
- name="auth" → grg add block auth
- name="shell", files=["sidebar"] → grg add block shell sidebar  
- name="claude" → grg add theme claude`,
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Resource name (e.g., "auth", "file-upload", "claude")',
            },
            files: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional file IDs for blocks (e.g., ["login", "sidebar"])',
            },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// List available resources (for MCP resource protocol)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const res = await getResources();
  
  const resources = [
    {
      uri: 'grg://catalog/themes',
      name: `GRG Kit Themes (${res.themes.length} available)`,
      description: 'Pre-built themes with Tailwind CSS v4, Spartan-NG integration, and dark mode',
      mimeType: 'application/json',
    },
    {
      uri: 'grg://catalog/components',
      name: `GRG Kit Components (${res.components.length} available)`,
      description: 'Custom Angular components with grg- prefix',
      mimeType: 'application/json',
    },
    {
      uri: 'grg://catalog/blocks',
      name: `GRG Kit Blocks (${res.blocks.length} available)`,
      description: 'Page blocks (auth, shell, settings, etc.)',
      mimeType: 'application/json',
    },
  ];
  
  return { resources };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const res = await getResources();
  const uri = request.params.uri;
  
  let content: any;
  
  switch (uri) {
    case 'grg://catalog/themes':
      content = res.themes;
      break;
    case 'grg://catalog/components':
      content = res.components;
      break;
    case 'grg://catalog/blocks':
      content = res.blocks;
      break;
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
  
  return {
    contents: [
      {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!args) {
    throw new Error('Missing arguments');
  }
  
  try {
    switch (name) {
      case 'catalog':
        return await catalog(args.query as string | undefined, args.name as string | undefined, args.category as string | undefined);
        
      case 'install':
        return await install(args.name as string, args.files as string[] | undefined);
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Unified catalog tool: search, list, or get details
// All resources use consistent format: type/name (e.g., theme/claude, component/file-upload, block/shell/sidebar)
async function catalog(query?: string, name?: string, category: string = 'all') {
  const res = await getResources();
  
  let items: any[] = [];
  
  if (category === 'all' || category === 'themes') {
    items.push(...res.themes.map((t: any) => ({
      type: 'theme',
      name: `theme/${t.name}`,
      id: t.name,
      title: t.title || t.name,
      description: t.description,
      tags: t.tags || [],
      install: getThemeInstallCommand(res.cli, t.name),
    })));
  }
  
  if (category === 'all' || category === 'components') {
    items.push(...res.components.map((c: any) => ({
      type: 'component',
      name: `component/${c.name}`,
      id: c.name,
      title: c.title || c.name,
      description: c.description,
      tags: c.tags || [],
      install: getComponentInstallCommand(c.name),
    })));
  }
  
  if (category === 'all' || category === 'blocks') {
    for (const block of res.blocks) {
      if (block.files && block.files.length > 0) {
        for (const file of block.files) {
          items.push({
            type: 'block',
            name: `block/${block.name}/${file.id}`,
            id: file.id,
            block: block.name,
            title: file.title,
            description: file.description || file.title,
            tags: [...(block.tags || []), file.id, ...(file.id.includes('-') ? file.id.split('-') : [])],
            install: getBlockInstallCommand(res.cli, block.name, [file.id]),
          });
        }
      }
    }
  }
  
  // Get details for a specific resource by name (supports multiple formats)
  if (name) {
    // Normalize: "claude" -> "theme/claude", "shell/sidebar" -> "block/shell/sidebar"
    let searchName = name;
    if (!name.startsWith('theme/') && !name.startsWith('component/') && !name.startsWith('block/')) {
      // Try to find by id or partial name
      const item = items.find((i) => i.id === name || i.name.endsWith(`/${name}`));
      if (item) {
        return { content: [{ type: 'text', text: JSON.stringify(item, null, 2) }] };
      }
    } else {
      const item = items.find((i) => i.name === searchName);
      if (item) {
        return { content: [{ type: 'text', text: JSON.stringify(item, null, 2) }] };
      }
    }
    throw new Error(`Resource "${name}" not found. Use catalog() to see all available resources.`);
  }
  
  // Filter by search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    items = items.filter((item) => {
      const searchText = `${item.name} ${item.title} ${item.description} ${item.tags?.join(' ')}`.toLowerCase();
      return searchText.includes(lowerQuery);
    });
  }
  
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ count: items.length, items }, null, 2),
    }],
  };
}

async function install(resource: string, files?: string[]) {
  const res = await getResources();
  
  // Handle formats: "theme/claude", "component/file-upload", "block/shell/sidebar", or just "claude"
  let name = resource;
  
  // Parse type/name format
  if (name.startsWith('theme/')) {
    const themeName = name.replace('theme/', '');
    const theme = res.themes.find((t: any) => t.name === themeName);
    if (theme) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name: `theme/${themeName}`,
            type: 'theme',
            command: getThemeInstallCommand(res.cli, themeName),
            postInstall: `Theme applied to styles.css.`,
          }, null, 2),
        }],
      };
    }
  }
  
  if (name.startsWith('component/')) {
    const componentName = name.replace('component/', '');
    const component = res.components.find((c: any) => c.name === componentName);
    if (component) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name: `component/${componentName}`,
            type: 'component',
            command: getComponentInstallCommand(componentName),
            postInstall: `Component downloaded. Import and use in your templates.`,
          }, null, 2),
        }],
      };
    }
  }
  
  if (name.startsWith('block/')) {
    const parts = name.replace('block/', '').split('/');
    const blockName = parts[0];
    const fileId = parts[1];
    const block = res.blocks.find((b: any) => b.name === blockName);
    if (block) {
      const command = fileId 
        ? getBlockInstallCommand(res.cli, blockName, [fileId])
        : getBlockInstallCommand(res.cli, blockName);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name: fileId ? `block/${blockName}/${fileId}` : `block/${blockName}`,
            type: 'block',
            command,
            postInstall: `Files downloaded to src/app/blocks/${blockName}/. Move to appropriate location and integrate.`,
          }, null, 2),
        }],
      };
    }
  }
  
  // Legacy format support: "shell/sidebar-footer" (without block/ prefix)
  if (name.includes('/')) {
    const [blockName, fileId] = name.split('/');
    const block = res.blocks.find((b: any) => b.name === blockName);
    if (block) {
      const command = getBlockInstallCommand(res.cli, blockName, [fileId]);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name: `${blockName}/${fileId}`,
            type: 'block',
            command,
            postInstall: `Files downloaded to src/app/blocks/${blockName}/. Move to appropriate location and integrate.`,
          }, null, 2),
        }],
      };
    }
  }
  
  // Auto-detect by short name (legacy support)
  const theme = res.themes.find((t: any) => t.name === name);
  if (theme) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: `theme/${name}`,
          type: 'theme',
          command: getThemeInstallCommand(res.cli, name),
          postInstall: `Theme applied to styles.css.`,
        }, null, 2),
      }],
    };
  }
  
  const component = res.components.find((c: any) => c.name === name);
  if (component) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: `component/${name}`,
          type: 'component',
          command: getComponentInstallCommand(name),
          postInstall: `Component downloaded. Import and use in your templates.`,
        }, null, 2),
      }],
    };
  }
  
  const block = res.blocks.find((b: any) => b.name === name);
  if (block) {
    const command = files && files.length > 0
      ? getBlockInstallCommand(res.cli, name, files)
      : getBlockInstallCommand(res.cli, name);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: `block/${name}`,
          type: 'block',
          command,
          postInstall: `Files downloaded to src/app/blocks/${name}/. Move to appropriate location and integrate.`,
        }, null, 2),
      }],
    };
  }
  
  throw new Error(`Resource "${name}" not found. Use catalog() to see available resources.`);
}


// Start the server
const transport = new StdioServerTransport();
server.connect(transport);

console.error('GRG Kit MCP server running on stdio');
