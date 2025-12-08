#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fetchCatalog, getResourcesSync } from './catalog-fetcher.js';
const execAsync = promisify(exec);
// Get resources - uses cache or fetches dynamically
async function getResources() {
    return await fetchCatalog();
}
// Sync version for non-async contexts
function getResourcesSync_() {
    return getResourcesSync();
}
const server = new Server({
    name: 'grg-kit',
    version: '0.2.1',
}, {
    capabilities: {
        tools: {},
        resources: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'search_ui_resources',
                description: 'Search for Angular UI components, themes, or blocks in GRG Kit. Use this FIRST when building UI. Returns matching resources with descriptions, tags, and usage info.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query (e.g., "form", "dashboard", "theme", "button")',
                        },
                        category: {
                            type: 'string',
                            enum: ['all', 'themes', 'components', 'blocks'],
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
                description: 'Install a GRG Kit block into the project. Returns installation status and next steps. Executes: grg add block <name> [files...]',
                inputSchema: {
                    type: 'object',
                    properties: {
                        resource: {
                            type: 'string',
                            description: 'Block name to install (e.g., "auth", "shell", "settings")',
                        },
                        files: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Optional specific files to install (e.g., ["login", "register"] for auth block). If omitted, installs all files.',
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
                            enum: ['all', 'themes', 'components', 'blocks'],
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
    let content;
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
            case 'search_ui_resources':
                return await searchResources(args.query, args.category);
            case 'get_resource_details':
                return await getResourceDetails(args.resource);
            case 'suggest_resources':
                return await suggestResources(args.requirement);
            case 'install_resource':
                return await installResource(args.resource, args.files, args.output);
            case 'list_available_resources':
                return await listResources(args.category);
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
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
async function searchResources(query, category = 'all') {
    const res = await getResources();
    const lowerQuery = query.toLowerCase();
    const results = [];
    const searchIn = (items, type) => {
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
    // Generate install commands based on type
    const getInstallCommand = (type, name) => {
        if (type === 'block')
            return `grg add block ${name}`;
        if (type === 'theme')
            return `grg init --theme ${name}`;
        return 'Included automatically with grg init';
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
async function getResourceDetails(resource) {
    const res = await getResources();
    const [category, name] = resource.split(':');
    let details;
    let installCmd;
    switch (category) {
        case 'theme':
            details = res.themes.find((t) => t.name === name);
            installCmd = `grg init --theme ${name}`;
            break;
        case 'component':
            details = res.components.find((c) => c.name === name);
            installCmd = 'Included automatically with grg init';
            break;
        case 'block':
            details = res.blocks.find((b) => b.name === name);
            installCmd = `grg add block ${name}`;
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
                    install: installCmd,
                    cli_available: true,
                }, null, 2),
            },
        ],
    };
}
async function suggestResources(requirement) {
    const res = await getResources();
    const lowerReq = requirement.toLowerCase();
    const suggestions = [];
    // Simple keyword matching for suggestions
    const keywords = {
        login: [
            { type: 'block', name: 'auth', install: 'grg add block auth login' },
        ],
        signup: [
            { type: 'block', name: 'auth', install: 'grg add block auth register' },
        ],
        register: [
            { type: 'block', name: 'auth', install: 'grg add block auth register' },
        ],
        auth: [
            { type: 'block', name: 'auth', install: 'grg add block auth' },
        ],
        dashboard: [
            { type: 'block', name: 'shell', install: 'grg add block shell' },
        ],
        shell: [
            { type: 'block', name: 'shell', install: 'grg add block shell' },
        ],
        footer: [
            { type: 'block', name: 'shell', install: 'grg add block shell sidebar-footer' },
        ],
        navigation: [
            { type: 'block', name: 'shell', install: 'grg add block shell' },
        ],
        sidebar: [
            { type: 'block', name: 'shell', install: 'grg add block shell sidebar' },
        ],
        topnav: [
            { type: 'block', name: 'shell', install: 'grg add block shell topnav' },
        ],
        collapsible: [
            { type: 'block', name: 'shell', install: 'grg add block shell collapsible' },
        ],
        settings: [
            { type: 'block', name: 'settings', install: 'grg add block settings' },
        ],
        form: [
            { type: 'component', name: 'stepper', install: 'Included automatically with grg init' },
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
                let details;
                if (item.type === 'theme')
                    details = res.themes.find((t) => t.name === item.name);
                else if (item.type === 'component')
                    details = res.components.find((c) => c.name === item.name);
                else if (item.type === 'block')
                    details = res.blocks.find((b) => b.name === item.name);
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
                    note: 'Run grg init in an Angular project to set up theme and Spartan-NG components. Use grg add block <name> [files...] for blocks.',
                }, null, 2),
            },
        ],
    };
}
async function installResource(resource, files, output) {
    // For blocks, use grg add block <name> [files...]
    const filesArg = files && files.length > 0 ? ` ${files.join(' ')}` : '';
    const outputFlag = output ? ` -o ${output}` : '';
    const command = `grg add block ${resource}${filesArg}${outputFlag}`;
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
    }
    catch (error) {
        throw new Error(`Installation failed: ${error.message}`);
    }
}
async function listResources(category = 'all') {
    const res = await getResources();
    const result = {
        category,
        resources: {},
    };
    if (category === 'all' || category === 'themes') {
        result.resources.themes = {
            count: res.themes.length,
            note: 'Themes are set via: grg init --theme <name>',
            items: res.themes.map((t) => ({
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
            note: 'Components are included automatically via: grg init',
            items: res.components.map((c) => ({
                name: c.name,
                title: c.title,
                description: c.description,
            })),
        };
    }
    if (category === 'all' || category === 'blocks') {
        result.resources.blocks = {
            count: res.blocks.length,
            note: 'Blocks are added via: grg add block <name> [files...]',
            items: res.blocks.map((b) => ({
                name: b.name,
                title: b.title,
                description: b.description,
                files: b.files?.map((f) => f.id) || [],
                install: `grg add block ${b.name}`,
                install_specific: b.files?.length > 0 ? `grg add block ${b.name} <fileId>` : undefined,
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
