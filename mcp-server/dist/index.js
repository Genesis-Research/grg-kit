#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { fetchCatalog, getResourcesSync } from './catalog-fetcher.js';
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
// Sync version for non-async contexts
function getResourcesSync_() {
    return getResourcesSync();
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
                description: 'Get detailed information about a specific GRG Kit resource including dependencies, tags, and installation command. Use format "type:name" (e.g., "block:auth", "theme:claude").',
                inputSchema: {
                    type: 'object',
                    properties: {
                        resource: {
                            type: 'string',
                            description: 'Resource identifier in "type:name" format. Examples: "block:auth", "block:shell", "block:settings", "theme:claude", "theme:modern-minimal", "component:file-upload"',
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
                description: `Install a GRG Kit block, component, or theme into the project. Returns installation command and POST-INSTALL INSTRUCTIONS that you MUST follow.

IMPORTANT: The 'resource' parameter should be JUST the name (e.g., "auth", "file-upload", "claude") - NOT prefixed with "block:", "component:", or "theme:".

The tool will auto-detect the Angular project root by searching for angular.json from the current working directory.

Examples:
- To install auth block: resource="auth" → runs: grg add block auth
- To install shell sidebar: resource="shell", files=["sidebar"] → runs: grg add block shell sidebar
- To install file-upload component: resource="file-upload" → runs: grg add component file-upload
- To install claude theme: resource="claude" → runs: grg add theme claude

CRITICAL: After running the install command, you MUST:
1. Read the postInstallInstructions in the response
2. Move the downloaded files from src/app/blocks/ to the suggested location (for blocks)
3. Follow the integrationSteps to wire the component into the app (routes, layout, etc.)
4. Do NOT leave blocks sitting in the blocks/ folder - integrate them properly!`,
                inputSchema: {
                    type: 'object',
                    properties: {
                        resource: {
                            type: 'string',
                            description: 'Block, component, or theme name to install. Blocks: "auth", "shell", "settings". Components: "file-upload". Themes: "claude", "modern-minimal", "grg-theme", etc. Do NOT include "block:", "component:", or "theme:" prefix - just the name.',
                        },
                        files: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Optional specific file IDs to install (only for blocks). For auth: ["login", "register", "forgot-password"]. For shell: ["sidebar", "sidebar-footer", "topnav", "topnav-footer", "collapsible", "collapsible-footer"]. If omitted, installs all files.',
                        },
                        output: {
                            type: 'string',
                            description: 'Optional custom output directory (relative to project root)',
                        },
                    },
                    required: ['resource'],
                },
            },
            {
                name: 'list_available_resources',
                description: 'List all available GRG Kit resources by category. Shows counts, descriptions, and CLI install commands. Use this to discover what blocks, themes, and components are available.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                            enum: ['all', 'themes', 'components', 'blocks'],
                            description: 'Category to list (default: all). Use "blocks" to see installable page blocks like auth, shell, settings.',
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
    // Generate install commands based on type (using CLI metadata)
    const getInstallCommand = (type, name) => {
        if (type === 'block')
            return getBlockInstallCommand(res.cli, name);
        if (type === 'theme')
            return getThemeInstallCommand(res.cli, name);
        if (type === 'component')
            return getComponentInstallCommand(name);
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
            installCmd = getThemeInstallCommand(res.cli, name);
            break;
        case 'component':
            details = res.components.find((c) => c.name === name);
            installCmd = getComponentInstallCommand(name);
            break;
        case 'block':
            details = res.blocks.find((b) => b.name === name);
            installCmd = getBlockInstallCommand(res.cli, name);
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
        upload: [
            { type: 'component', name: 'file-upload', install: 'grg add component file-upload' },
        ],
        file: [
            { type: 'component', name: 'file-upload', install: 'grg add component file-upload' },
        ],
        theme: [
            { type: 'theme', name: 'grg-theme', install: 'grg add theme grg-theme' },
            { type: 'theme', name: 'claude', install: 'grg add theme claude' },
            { type: 'theme', name: 'modern-minimal', install: 'grg add theme modern-minimal' },
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
                    note: 'Run grg init in an Angular project to set up Spartan-NG components. Use grg add theme <name> for themes, grg add block <name> [files...] for blocks.',
                }, null, 2),
            },
        ],
    };
}
async function installResource(resource, files, output) {
    const res = await getResources();
    // Strip prefixes if provided (common LLM mistake)
    let resourceName = resource;
    let resourceType = null;
    if (resource.startsWith('block:')) {
        resourceName = resource.replace('block:', '');
        resourceType = 'block';
    }
    else if (resource.startsWith('component:')) {
        resourceName = resource.replace('component:', '');
        resourceType = 'component';
    }
    else if (resource.startsWith('theme:')) {
        resourceName = resource.replace('theme:', '');
        resourceType = 'theme';
    }
    // Auto-detect resource type if not specified
    const validBlocks = getValidBlocks(res.cli);
    const validComponents = res.components.map((c) => c.name);
    const validThemes = res.themes.map((t) => t.name);
    if (!resourceType) {
        if (validBlocks.includes(resourceName)) {
            resourceType = 'block';
        }
        else if (validComponents.includes(resourceName)) {
            resourceType = 'component';
        }
        else if (validThemes.includes(resourceName)) {
            resourceType = 'theme';
        }
    }
    // Validate resource
    if (!resourceType) {
        throw new Error(`Invalid resource: "${resourceName}". Valid blocks: ${validBlocks.join(', ')}. Valid components: ${validComponents.join(', ')}. Valid themes: ${validThemes.join(', ')}`);
    }
    let command;
    let postInstall;
    if (resourceType === 'block') {
        if (!validBlocks.includes(resourceName)) {
            throw new Error(`Invalid block name: "${resourceName}". Valid blocks are: ${validBlocks.join(', ')}`);
        }
        command = getBlockInstallCommand(res.cli, resourceName, files) + (output ? ` -o ${output}` : '');
        postInstall = `IMPORTANT: After running the command, files will be downloaded to src/app/blocks/${resourceName}/. Do NOT leave them there. Move them to an appropriate location in the project structure (e.g., src/app/pages/, src/app/features/, src/app/layout/) and integrate them properly - add routes, update imports, wire into the app architecture. After integration is complete, delete the src/app/blocks/${resourceName}/ folder to clean up.`;
    }
    else if (resourceType === 'component') {
        if (!validComponents.includes(resourceName)) {
            throw new Error(`Invalid component name: "${resourceName}". Valid components are: ${validComponents.join(', ')}`);
        }
        command = getComponentInstallCommand(resourceName) + (output ? ` -o ${output}` : '');
        postInstall = `Component downloaded. Import it in your module/component and use it in your templates.`;
    }
    else {
        // theme
        if (!validThemes.includes(resourceName)) {
            throw new Error(`Invalid theme name: "${resourceName}". Valid themes are: ${validThemes.join(', ')}`);
        }
        command = getThemeInstallCommand(res.cli, resourceName) + (output ? ` -o ${output}` : '');
        postInstall = `Theme downloaded to src/themes/ and styles.css has been updated. The theme is now active.`;
    }
    // Return the command for the AI to execute via run_command tool
    // MCP servers run in a separate process and don't have access to the user's project directory
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    success: true,
                    resource: resourceName,
                    type: resourceType,
                    command,
                    instruction: 'Run this command in the Angular project root directory using the run_command tool.',
                    postInstall,
                }, null, 2),
            },
        ],
    };
}
async function listResources(category = 'all') {
    const res = await getResources();
    const cli = res.cli;
    const result = {
        category,
        resources: {},
        cli_usage: cli?.commands,
    };
    if (category === 'all' || category === 'themes') {
        result.resources.themes = {
            count: res.themes.length,
            note: 'Themes are added via: grg add theme <themeName>',
            items: res.themes.map((t) => ({
                name: t.name,
                title: t.title,
                description: t.description,
                install: getThemeInstallCommand(cli, t.name),
            })),
        };
    }
    if (category === 'all' || category === 'components') {
        result.resources.components = {
            count: res.components.length,
            note: 'Components are added via: grg add component <componentName>',
            items: res.components.map((c) => ({
                name: c.name,
                title: c.title,
                description: c.description,
                install: getComponentInstallCommand(c.name),
            })),
        };
    }
    if (category === 'all' || category === 'blocks') {
        result.resources.blocks = {
            count: res.blocks.length,
            note: `Blocks are added via: ${cli?.commands.addBlock.usage || 'grg add block <blockName> [fileIds...]'}`,
            items: res.blocks.map((b) => ({
                name: b.name,
                title: b.title,
                description: b.description,
                files: b.files?.map((f) => f.id) || [],
                install: getBlockInstallCommand(cli, b.name),
                install_specific: b.files?.length > 0 ? getBlockInstallCommand(cli, b.name, ['<fileId>']) : undefined,
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
