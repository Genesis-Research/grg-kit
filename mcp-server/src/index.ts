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

interface GRGMetadata {
  version: string;
  name: string;
  description: string;
  commands: any[];
  resources: {
    themes: any[];
    components: any[];
    layouts: any[];
    examples: {
      all: any;
      components: any[];
    };
  };
}

let cachedMetadata: GRGMetadata | null = null;

async function getMetadata(): Promise<GRGMetadata> {
  if (cachedMetadata) {
    return cachedMetadata;
  }

  try {
    const { stdout } = await execAsync('grg metadata');
    cachedMetadata = JSON.parse(stdout);
    return cachedMetadata!;
  } catch (error) {
    throw new Error('Failed to get GRG Kit metadata. Is grg-kit-cli installed?');
  }
}

const server = new Server(
  {
    name: 'grg-kit',
    version: '0.1.0',
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
  const metadata = await getMetadata();
  
  return {
    tools: [
      {
        name: 'search_ui_resources',
        description: 'Search for Angular UI components, themes, layouts, or examples in GRG Kit. Use this FIRST when building UI. Returns matching resources with descriptions, tags, and usage info.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (e.g., "form", "dashboard", "theme", "button")',
            },
            category: {
              type: 'string',
              enum: ['all', 'themes', 'components', 'layouts', 'examples'],
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
              description: 'Resource identifier (e.g., "theme:claude", "component:stepper", "examples:button")',
            },
          },
          required: ['resource'],
        },
      },
      {
        name: 'suggest_resources',
        description: 'Get AI-powered suggestions for GRG Kit resources based on user requirements. Use this to recommend themes, components, or layouts.',
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
        description: 'Install a GRG Kit resource into the project. Returns installation status and next steps.',
        inputSchema: {
          type: 'object',
          properties: {
            resource: {
              type: 'string',
              description: 'Resource to install (e.g., "theme:claude", "component:stepper", "examples:all")',
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
              enum: ['all', 'themes', 'components', 'layouts', 'examples'],
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
  const metadata = await getMetadata();
  
  const resources = [
    {
      uri: 'grg://catalog/themes',
      name: `GRG Kit Themes (${metadata.resources.themes.length} available)`,
      description: 'Pre-built themes with Tailwind CSS v4, Spartan-NG integration, and dark mode',
      mimeType: 'application/json',
    },
    {
      uri: 'grg://catalog/components',
      name: `GRG Kit Components (${metadata.resources.components.length} available)`,
      description: 'Custom Angular components with grg- prefix',
      mimeType: 'application/json',
    },
    {
      uri: 'grg://catalog/layouts',
      name: `GRG Kit Layouts (${metadata.resources.layouts.length} available)`,
      description: 'Page layout templates (dashboard, auth, etc.)',
      mimeType: 'application/json',
    },
    {
      uri: 'grg://catalog/examples',
      name: `Spartan-NG Examples (${metadata.resources.examples.components.length}+ available)`,
      description: 'Complete examples of all Spartan-NG components',
      mimeType: 'application/json',
    },
  ];
  
  return { resources };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const metadata = await getMetadata();
  const uri = request.params.uri;
  
  let content: any;
  
  switch (uri) {
    case 'grg://catalog/themes':
      content = metadata.resources.themes;
      break;
    case 'grg://catalog/components':
      content = metadata.resources.components;
      break;
    case 'grg://catalog/layouts':
      content = metadata.resources.layouts;
      break;
    case 'grg://catalog/examples':
      content = metadata.resources.examples;
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

async function searchResources(query: string, category: string = 'all') {
  const metadata = await getMetadata();
  const lowerQuery = query.toLowerCase();
  const results: any[] = [];
  
  const searchIn = (items: any[], type: string) => {
    return items.filter((item) => {
      const searchText = `${item.name} ${item.title} ${item.description} ${item.tags?.join(' ')}`.toLowerCase();
      return searchText.includes(lowerQuery);
    }).map((item) => ({ ...item, type }));
  };
  
  if (category === 'all' || category === 'themes') {
    results.push(...searchIn(metadata.resources.themes, 'theme'));
  }
  if (category === 'all' || category === 'components') {
    results.push(...searchIn(metadata.resources.components, 'component'));
  }
  if (category === 'all' || category === 'layouts') {
    results.push(...searchIn(metadata.resources.layouts, 'layout'));
  }
  if (category === 'all' || category === 'examples') {
    results.push(...searchIn(metadata.resources.examples.components, 'examples'));
  }
  
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
            install: `grg add ${r.type}:${r.name}`,
          })),
        }, null, 2),
      },
    ],
  };
}

async function getResourceDetails(resource: string) {
  const metadata = await getMetadata();
  const [category, name] = resource.split(':');
  
  let details: any;
  
  switch (category) {
    case 'theme':
      details = metadata.resources.themes.find((t) => t.name === name);
      break;
    case 'component':
      details = metadata.resources.components.find((c) => c.name === name);
      break;
    case 'layout':
      details = metadata.resources.layouts.find((l) => l.name === name);
      break;
    case 'examples':
      if (name === 'all') {
        details = metadata.resources.examples.all;
      } else {
        details = metadata.resources.examples.components.find((e) => e.name === name);
      }
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
          install: `grg add ${resource}`,
          cli_available: true,
        }, null, 2),
      },
    ],
  };
}

async function suggestResources(requirement: string) {
  const metadata = await getMetadata();
  const lowerReq = requirement.toLowerCase();
  const suggestions: any[] = [];
  
  // Simple keyword matching for suggestions
  const keywords = {
    login: ['layout:auth', 'examples:form-field', 'examples:input', 'examples:button'],
    auth: ['layout:auth', 'examples:form-field', 'examples:input'],
    dashboard: ['layout:dashboard', 'examples:card', 'examples:table', 'examples:navigation-menu'],
    form: ['examples:form-field', 'examples:input', 'examples:button', 'examples:select', 'component:stepper'],
    table: ['examples:table', 'examples:data-table', 'examples:pagination'],
    theme: ['theme:grg-theme', 'theme:claude', 'theme:modern-minimal'],
  };
  
  // Find matching keywords
  for (const [keyword, resources] of Object.entries(keywords)) {
    if (lowerReq.includes(keyword)) {
      for (const res of resources) {
        const [cat, name] = res.split(':');
        let item: any;
        
        if (cat === 'theme') item = metadata.resources.themes.find((t) => t.name === name);
        else if (cat === 'component') item = metadata.resources.components.find((c) => c.name === name);
        else if (cat === 'layout') item = metadata.resources.layouts.find((l) => l.name === name);
        else if (cat === 'examples') item = metadata.resources.examples.components.find((e) => e.name === name);
        
        if (item && !suggestions.find((s) => s.resource === res)) {
          suggestions.push({
            resource: res,
            title: item.title,
            description: item.description,
            reason: `Matches "${keyword}" in your requirement`,
            install: `grg add ${res}`,
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
          note: 'Install these resources with: grg add <resource>',
        }, null, 2),
      },
    ],
  };
}

async function installResource(resource: string, output?: string) {
  const outputFlag = output ? ` -o ${output}` : '';
  const command = `grg add ${resource}${outputFlag}`;
  
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

async function listResources(category: string = 'all') {
  const metadata = await getMetadata();
  
  const result: any = {
    category,
    resources: {},
  };
  
  if (category === 'all' || category === 'themes') {
    result.resources.themes = {
      count: metadata.resources.themes.length,
      items: metadata.resources.themes.map((t) => ({
        name: t.name,
        title: t.title,
        description: t.description,
        install: `grg add theme:${t.name}`,
      })),
    };
  }
  
  if (category === 'all' || category === 'components') {
    result.resources.components = {
      count: metadata.resources.components.length,
      items: metadata.resources.components.map((c) => ({
        name: c.name,
        title: c.title,
        description: c.description,
        install: `grg add component:${c.name}`,
      })),
    };
  }
  
  if (category === 'all' || category === 'layouts') {
    result.resources.layouts = {
      count: metadata.resources.layouts.length,
      items: metadata.resources.layouts.map((l) => ({
        name: l.name,
        title: l.title,
        description: l.description,
        install: `grg add layout:${l.name}`,
      })),
    };
  }
  
  if (category === 'all' || category === 'examples') {
    result.resources.examples = {
      count: metadata.resources.examples.components.length,
      all: {
        title: metadata.resources.examples.all.title,
        description: metadata.resources.examples.all.description,
        install: 'grg add examples:all',
      },
      popular: metadata.resources.examples.components
        .filter((e) => ['button', 'card', 'dialog', 'form-field', 'input', 'table'].includes(e.name))
        .map((e) => ({
          name: e.name,
          title: e.title,
          description: e.description,
          install: `grg add examples:${e.name}`,
        })),
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
