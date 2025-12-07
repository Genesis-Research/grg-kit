#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface GRGResources {
  themes: any[];
  components: any[];
  blocks: any[];
  examples: {
    all: any;
    components: any[];
  };
}

// Inline resources - these match cli/config/resources.js
const RESOURCES: GRGResources = {
  themes: [
    { name: 'amber-minimal', title: 'Amber Minimal', description: 'Warm amber accents', tags: ['minimal', 'warm', 'amber', 'orange'] },
    { name: 'claude', title: 'Claude', description: 'Claude-inspired warm tones', tags: ['warm', 'orange', 'brown', 'claude'] },
    { name: 'clean-slate', title: 'Clean Slate', description: 'Minimal grayscale palette', tags: ['minimal', 'grayscale', 'neutral', 'clean'] },
    { name: 'grg-theme', title: 'GRG Theme', description: 'Default theme with purple/orange accents', tags: ['default', 'purple', 'orange', 'colorful'] },
    { name: 'mocks', title: 'Mocks', description: 'Theme for mockups and prototypes', tags: ['mockup', 'prototype', 'design'] },
    { name: 'modern-minimal', title: 'Modern Minimal', description: 'Contemporary minimal design', tags: ['minimal', 'modern', 'contemporary', 'clean'] },
  ],
  components: [
    { name: 'file-upload', title: 'File Upload Component', description: 'File upload component', tags: ['file', 'upload', 'form'] },
    { name: 'stepper', title: 'Stepper Component', description: 'Multi-step form component with progress indicator', tags: ['form', 'wizard', 'multi-step', 'progress'] },
  ],
  blocks: [
    { name: 'auth', title: 'Auth Block', description: 'Authentication pages (login, signup, forgot password)', tags: ['auth', 'login', 'signup', 'authentication'] },
    { name: 'settings', title: 'Settings Block', description: 'Settings page layout with sidebar navigation', tags: ['settings', 'preferences', 'account'] },
    { name: 'shell', title: 'App Shell Block', description: 'Application shell with sidebar, header, and content area', tags: ['shell', 'layout', 'sidebar', 'header'] },
  ],
  examples: {
    all: { name: 'all', title: 'All Spartan-NG Examples', description: 'Complete collection of 56+ Spartan-NG component examples', count: '56+' },
    components: [
      { name: 'accordion', title: 'Accordion Examples', description: 'Collapsible content sections', tags: ['accordion'] },
      { name: 'alert', title: 'Alert Examples', description: 'Status messages and notifications', tags: ['alert'] },
      { name: 'button', title: 'Button Examples', description: 'Interactive buttons with multiple variants', tags: ['button'] },
      { name: 'card', title: 'Card Examples', description: 'Content containers', tags: ['card'] },
      { name: 'dialog', title: 'Dialog Examples', description: 'Modal dialogs and popups', tags: ['dialog'] },
      { name: 'form-field', title: 'Form Field Examples', description: 'Complete form fields with validation', tags: ['form-field'] },
      { name: 'input', title: 'Input Examples', description: 'Form input fields', tags: ['input'] },
      { name: 'select', title: 'Select Examples', description: 'Dropdown selection controls', tags: ['select'] },
      { name: 'table', title: 'Table Examples', description: 'Data tables', tags: ['table'] },
      { name: 'data-table', title: 'Data Table Examples', description: 'Advanced data tables with sorting and filtering', tags: ['data-table'] },
    ],
  },
};

function getResources(): GRGResources {
  return RESOURCES;
}

const server = new Server(
  {
    name: 'grg-kit',
    version: '0.2.0',
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
        name: 'search_ui_resources',
        description: 'Search for Angular UI components, themes, blocks, or examples in GRG Kit. Use this FIRST when building UI. Returns matching resources with descriptions, tags, and usage info.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (e.g., "form", "dashboard", "theme", "button")',
            },
            category: {
              type: 'string',
              enum: ['all', 'themes', 'components', 'blocks', 'examples'],
              description: 'Filter by category (default: all)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_resource_details',
        description: 'Get detailed information about a specific GRG Kit resource including dependencies, tags, and installation command.',
        inputSchema: {
          type: 'object',
          properties: {
            resource: {
              type: 'string',
              description: 'Resource identifier (e.g., "block:auth", "block:shell", "theme:claude")',
            },
          },
          required: ['resource'],
        },
      },
      {
        name: 'suggest_resources',
        description: 'Get AI-powered suggestions for GRG Kit resources based on user requirements. Use this to recommend themes, components, or blocks.',
        inputSchema: {
          type: 'object',
          properties: {
            requirement: {
              type: 'string',
              description: 'User requirement (e.g., "I need a login page", "build a dashboard", "form with validation")',
            },
          },
          required: ['requirement'],
        },
      },
      {
        name: 'install_resource',
        description: 'Install a GRG Kit block into the project. Returns installation status and next steps. Executes: grg add block --<name>',
        inputSchema: {
          type: 'object',
          properties: {
            resource: {
              type: 'string',
              description: 'Block name to install (e.g., "auth", "shell", "settings")',
            },
            output: {
              type: 'string',
              description: 'Optional custom output directory',
            },
          },
          required: ['resource'],
        },
      },
      {
        name: 'list_available_resources',
        description: 'List all available GRG Kit resources by category. Shows counts and descriptions.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['all', 'themes', 'components', 'blocks', 'examples'],
              description: 'Category to list (default: all)',
            },
          },
        },
      },
    ],
  };
});

// List available resources (for MCP resource protocol)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const res = getResources();
  
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
    {
      uri: 'grg://catalog/examples',
      name: `Spartan-NG Examples (${res.examples.components.length}+ available)`,
      description: 'Complete examples of all Spartan-NG components',
      mimeType: 'application/json',
    },
  ];
  
  return { resources };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const res = getResources();
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
    case 'grg://catalog/examples':
      content = res.examples;
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
      case 'search_ui_resources':
        return await searchResources(args.query as string, args.category as string);
        
      case 'get_resource_details':
        return await getResourceDetails(args.resource as string);
        
      case 'suggest_resources':
        return await suggestResources(args.requirement as string);
        
      case 'install_resource':
        return await installResource(args.resource as string, args.output as string | undefined);
        
      case 'list_available_resources':
        return await listResources(args.category as string | undefined);
        
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

function searchResources(query: string, category: string = 'all') {
  const res = getResources();
  const lowerQuery = query.toLowerCase();
  const results: any[] = [];
  
  const searchIn = (items: any[], type: string) => {
    return items.filter((item) => {
      const searchText = `${item.name} ${item.title} ${item.description} ${item.tags?.join(' ')}`.toLowerCase();
      return searchText.includes(lowerQuery);
    }).map((item) => ({ ...item, type }));
  };
  
  if (category === 'all' || category === 'themes') {
    results.push(...searchIn(res.themes, 'theme'));
  }
  if (category === 'all' || category === 'components') {
    results.push(...searchIn(res.components, 'component'));
  }
  if (category === 'all' || category === 'blocks') {
    results.push(...searchIn(res.blocks, 'block'));
  }
  if (category === 'all' || category === 'examples') {
    results.push(...searchIn(res.examples.components, 'examples'));
  }
  
  // Generate install commands based on type
  const getInstallCommand = (type: string, name: string) => {
    if (type === 'block') return `grg add block --${name}`;
    if (type === 'theme') return `grg init --theme ${name}`;
    return `Installed via grg init`;
  };
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          query,
          category,
          count: results.length,
          results: results.map((r) => ({
            type: r.type,
            name: r.name,
            title: r.title,
            description: r.description,
            tags: r.tags,
            install: getInstallCommand(r.type, r.name),
          })),
        }, null, 2),
      },
    ],
  };
}

function getResourceDetails(resource: string) {
  const res = getResources();
  const [category, name] = resource.split(':');
  
  let details: any;
  let installCmd: string;
  
  switch (category) {
    case 'theme':
      details = res.themes.find((t: any) => t.name === name);
      installCmd = `grg init --theme ${name}`;
      break;
    case 'component':
      details = res.components.find((c: any) => c.name === name);
      installCmd = 'Installed via grg init';
      break;
    case 'block':
      details = res.blocks.find((b: any) => b.name === name);
      installCmd = `grg add block --${name}`;
      break;
    case 'examples':
      if (name === 'all') {
        details = res.examples.all;
      } else {
        details = res.examples.components.find((e: any) => e.name === name);
      }
      installCmd = 'Installed via grg init';
      break;
  }
  
  if (!details) {
    throw new Error(`Resource not found: ${resource}`);
  }
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          resource,
          ...details,
          install: installCmd!,
          cli_available: true,
        }, null, 2),
      },
    ],
  };
}

function suggestResources(requirement: string) {
  const res = getResources();
  const lowerReq = requirement.toLowerCase();
  const suggestions: any[] = [];
  
  // Simple keyword matching for suggestions
  const keywords: Record<string, { type: string; name: string; install: string }[]> = {
    login: [
      { type: 'block', name: 'auth', install: 'grg add block --auth' },
    ],
    auth: [
      { type: 'block', name: 'auth', install: 'grg add block --auth' },
    ],
    dashboard: [
      { type: 'block', name: 'shell', install: 'grg add block --shell' },
    ],
    shell: [
      { type: 'block', name: 'shell', install: 'grg add block --shell' },
    ],
    settings: [
      { type: 'block', name: 'settings', install: 'grg add block --settings' },
    ],
    form: [
      { type: 'component', name: 'stepper', install: 'Installed via grg init' },
    ],
    theme: [
      { type: 'theme', name: 'grg-theme', install: 'grg init --theme grg-theme' },
      { type: 'theme', name: 'claude', install: 'grg init --theme claude' },
      { type: 'theme', name: 'modern-minimal', install: 'grg init --theme modern-minimal' },
    ],
  };
  
  // Find matching keywords
  for (const [keyword, items] of Object.entries(keywords)) {
    if (lowerReq.includes(keyword)) {
      for (const item of items) {
        let details: any;
        
        if (item.type === 'theme') details = res.themes.find((t: any) => t.name === item.name);
        else if (item.type === 'component') details = res.components.find((c: any) => c.name === item.name);
        else if (item.type === 'block') details = res.blocks.find((b: any) => b.name === item.name);
        
        if (details && !suggestions.find((s) => s.name === item.name)) {
          suggestions.push({
            type: item.type,
            name: item.name,
            title: details.title,
            description: details.description,
            reason: `Matches "${keyword}" in your requirement`,
            install: item.install,
          });
        }
      }
    }
  }
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          requirement,
          suggestions_count: suggestions.length,
          suggestions,
          note: 'Use grg init to set up theme and components, grg add block --<name> for blocks',
        }, null, 2),
      },
    ],
  };
}

async function installResource(resource: string, output?: string) {
  // For blocks, use grg add block --<name>
  const outputFlag = output ? ` -o ${output}` : '';
  const command = `grg add block --${resource}${outputFlag}`;
  
  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            resource,
            command,
            output: stdout || stderr,
          }, null, 2),
        },
      ],
    };
  } catch (error: any) {
    throw new Error(`Installation failed: ${error.message}`);
  }
}

function listResources(category: string = 'all') {
  const res = getResources();
  
  const result: any = {
    category,
    resources: {},
  };
  
  if (category === 'all' || category === 'themes') {
    result.resources.themes = {
      count: res.themes.length,
      note: 'Themes are set via: grg init --theme <name>',
      items: res.themes.map((t: any) => ({
        name: t.name,
        title: t.title,
        description: t.description,
        install: `grg init --theme ${t.name}`,
      })),
    };
  }
  
  if (category === 'all' || category === 'components') {
    result.resources.components = {
      count: res.components.length,
      note: 'Components are installed automatically via: grg init',
      items: res.components.map((c: any) => ({
        name: c.name,
        title: c.title,
        description: c.description,
      })),
    };
  }
  
  if (category === 'all' || category === 'blocks') {
    result.resources.blocks = {
      count: res.blocks.length,
      note: 'Blocks are added via: grg add block --<name>',
      items: res.blocks.map((b: any) => ({
        name: b.name,
        title: b.title,
        description: b.description,
        install: `grg add block --${b.name}`,
      })),
    };
  }
  
  if (category === 'all' || category === 'examples') {
    result.resources.examples = {
      count: res.examples.components.length,
      note: 'Examples are installed automatically via: grg init',
      all: {
        title: res.examples.all.title,
        description: res.examples.all.description,
      },
    };
  }
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

// Start the server
const transport = new StdioServerTransport();
server.connect(transport);

console.error('GRG Kit MCP server running on stdio');
