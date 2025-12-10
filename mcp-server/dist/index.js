#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { fetchCatalog } from './catalog-fetcher.js';
// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const VERSION = packageJson.version;
// Helper functions to generate CLI commands from metadata
function getBlockInstallCommand(cli, blockName, fileIds = []) {
    const files = fileIds.length > 0 ? ` ${fileIds.join(' ')}` : '';
    return `grg add block ${blockName}${files}`;
}
// Generate post-install instructions for blocks
function getBlockPostInstallInstructions(blockName, fileIds = []) {
    const integrationMap = {
        auth: {
            downloadLocation: 'src/app/blocks/auth/',
            suggestedLocation: 'src/app/pages/auth/',
            estimatedTime: '5-10 minutes',
            steps: [
                {
                    action: 'move',
                    description: 'Move files to pages directory',
                    from: 'src/app/blocks/auth/',
                    to: 'src/app/pages/auth/',
                    files: fileIds.length > 0 ? fileIds.map(id => `${id}.component.ts`) : ['*.component.ts']
                },
                {
                    action: 'addRoutes',
                    description: 'Add authentication routes',
                    file: 'src/app/app.routes.ts',
                    routes: fileIds.length > 0 ? fileIds.map(id => ({
                        path: id === 'login' ? 'login' : id === 'register' ? 'register' : 'forgot-password',
                        component: `${id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Component`
                    })) : [
                        { path: 'login', component: 'LoginComponent' },
                        { path: 'register', component: 'RegisterComponent' },
                        { path: 'forgot-password', component: 'ForgotPasswordComponent' }
                    ]
                },
                {
                    action: 'createService',
                    description: 'Create or connect to AuthService',
                    file: 'src/app/services/auth.service.ts',
                    methods: ['login(email: string, password: string)', 'register(userData)', 'resetPassword(email: string)']
                },
                {
                    action: 'updateComponent',
                    description: 'Connect form submissions to AuthService',
                    note: 'Update onSubmit() methods in components to call your auth service'
                }
            ]
        },
        settings: {
            downloadLocation: 'src/app/blocks/settings/',
            suggestedLocation: 'src/app/pages/settings/',
            estimatedTime: '10-15 minutes',
            steps: [
                {
                    action: 'move',
                    description: 'Move files to pages directory',
                    from: 'src/app/blocks/settings/',
                    to: 'src/app/pages/settings/',
                    files: fileIds.length > 0 ? fileIds.map(id => `${id}.component.ts`) : ['*.component.ts']
                },
                {
                    action: 'addRoutes',
                    description: 'Add settings routes with children',
                    file: 'src/app/app.routes.ts',
                    note: 'Create parent route with child routes for each settings page'
                },
                {
                    action: 'createService',
                    description: 'Create UserService for profile management',
                    file: 'src/app/services/user.service.ts',
                    methods: ['updateProfile(data)', 'changePassword(old, new)', 'updateNotificationPreferences(prefs)']
                }
            ]
        },
        shell: {
            downloadLocation: 'src/app/blocks/shell/',
            suggestedLocation: 'src/app/layout/',
            estimatedTime: '15-20 minutes',
            steps: [
                {
                    action: 'move',
                    description: 'Move shell component to layout directory',
                    from: 'src/app/blocks/shell/',
                    to: 'src/app/layout/',
                    files: fileIds.length > 0 ? fileIds.map(id => `${id}.component.ts`) : ['*.component.ts']
                },
                {
                    action: 'wrapApp',
                    description: 'Wrap app content with shell component',
                    file: 'src/app/app.component.ts',
                    note: 'Use shell component as main layout wrapper'
                },
                {
                    action: 'configure',
                    description: 'Configure navigation items',
                    note: 'Update navigation menu items, logo, and app name in shell component'
                },
                {
                    action: 'addRouterOutlet',
                    description: 'Add router-outlet inside shell',
                    note: 'Ensure router-outlet is placed in shell template for page content'
                }
            ]
        }
    };
    const defaultInstructions = {
        downloadLocation: `src/app/blocks/${blockName}/`,
        suggestedLocation: `src/app/pages/${blockName}/`,
        estimatedTime: '5-10 minutes',
        steps: [
            {
                action: 'move',
                description: 'Move files to appropriate location',
                from: `src/app/blocks/${blockName}/`,
                to: `src/app/pages/${blockName}/`,
                files: ['*.component.ts']
            },
            {
                action: 'addRoutes',
                description: 'Add routes to app.routes.ts',
                file: 'src/app/app.routes.ts'
            },
            {
                action: 'integrate',
                description: 'Connect to required services and customize'
            }
        ]
    };
    return integrationMap[blockName] || defaultInstructions;
}
function getThemeInstallCommand(cli, themeName) {
    return `grg add theme ${themeName}`;
}
function getValidBlocks(cli) {
    return cli?.commands.addBlock.validBlocks || ['auth', 'shell', 'settings'];
}
function getComponentInstallCommand(componentName) {
    return `grg add component ${componentName}`;
}
// Get resources - uses cache or fetches dynamically
async function getResources() {
    return await fetchCatalog();
}
const server = new Server({
    name: 'grg-kit',
    version: VERSION,
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
            case 'catalog':
                return await catalog(args.query, args.name, args.category);
            case 'install':
                return await install(args.name, args.files);
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
// Unified catalog tool: search, list, or get details
// All resources use consistent format: type/name (e.g., theme/claude, component/file-upload, block/shell/sidebar)
async function catalog(query, name, category = 'all') {
    const res = await getResources();
    let items = [];
    if (category === 'all' || category === 'themes') {
        items.push(...res.themes.map((t) => ({
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
        items.push(...res.components.map((c) => ({
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
        }
        else {
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
async function install(resource, files) {
    const res = await getResources();
    // Handle formats: "theme/claude", "component/file-upload", "block/shell/sidebar", or just "claude"
    let name = resource;
    // Parse type/name format
    if (name.startsWith('theme/')) {
        const themeName = name.replace('theme/', '');
        const theme = res.themes.find((t) => t.name === themeName);
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
        const component = res.components.find((c) => c.name === componentName);
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
        const block = res.blocks.find((b) => b.name === blockName);
        if (block) {
            const fileIds = fileId ? [fileId] : [];
            const command = fileId
                ? getBlockInstallCommand(res.cli, blockName, [fileId])
                : getBlockInstallCommand(res.cli, blockName);
            const postInstallInstructions = getBlockPostInstallInstructions(blockName, fileIds);
            return {
                content: [{
                        type: 'text',
                        text: JSON.stringify({
                            name: fileId ? `block/${blockName}/${fileId}` : `block/${blockName}`,
                            type: 'block',
                            command,
                            postInstallInstructions,
                        }, null, 2),
                    }],
            };
        }
    }
    // Legacy format support: "shell/sidebar-footer" (without block/ prefix)
    if (name.includes('/')) {
        const [blockName, fileId] = name.split('/');
        const block = res.blocks.find((b) => b.name === blockName);
        if (block) {
            const command = getBlockInstallCommand(res.cli, blockName, [fileId]);
            const postInstallInstructions = getBlockPostInstallInstructions(blockName, [fileId]);
            return {
                content: [{
                        type: 'text',
                        text: JSON.stringify({
                            name: `${blockName}/${fileId}`,
                            type: 'block',
                            command,
                            postInstallInstructions,
                        }, null, 2),
                    }],
            };
        }
    }
    // Auto-detect by short name (legacy support)
    const theme = res.themes.find((t) => t.name === name);
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
    const component = res.components.find((c) => c.name === name);
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
    const block = res.blocks.find((b) => b.name === name);
    if (block) {
        const fileIds = files && files.length > 0 ? files : [];
        const command = fileIds.length > 0
            ? getBlockInstallCommand(res.cli, name, fileIds)
            : getBlockInstallCommand(res.cli, name);
        const postInstallInstructions = getBlockPostInstallInstructions(name, fileIds);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        name: `block/${name}`,
                        type: 'block',
                        command,
                        postInstallInstructions,
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
