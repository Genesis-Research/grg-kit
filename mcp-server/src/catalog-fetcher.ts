/**
 * Catalog fetcher for MCP server
 * Calls `grg list --json` to get resources from CLI (single source of truth)
 */

import { execSync } from 'child_process';

export interface ResourceItem {
  name: string;
  title: string;
  description: string;
  tags: string[];
  path?: string;
  defaultOutput?: string;
  dependencies?: string[];
  files?: { id: string; file: string; title: string; description: string }[];
}

export interface CLICommand {
  usage: string;
  themeFlag?: string;
  validBlocks?: string[];
  validComponents?: string[];
}

export interface CLIMetadata {
  name: string;
  version: string;
  commands: {
    init: CLICommand;
    addBlock: CLICommand;
    addComponent?: CLICommand;
    addTheme?: CLICommand;
    list: CLICommand;
  };
}

export interface GRGResources {
  themes: ResourceItem[];
  components: ResourceItem[];
  blocks: ResourceItem[];
  cli?: CLIMetadata;
}

// In-memory cache (short TTL since CLI is fast)
let memoryCache: GRGResources | null = null;
let memoryCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute

/**
 * Fetch catalog by calling `grg list --json`
 */
export async function fetchCatalog(): Promise<GRGResources> {
  // Check memory cache first
  if (memoryCache && Date.now() - memoryCacheTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    // Call CLI to get resources
    const output = execSync('grg list --json', {
      encoding: 'utf-8',
      timeout: 10000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const data = JSON.parse(output);
    
    const resources: GRGResources = {
      themes: data.themes || [],
      components: data.components || [],
      blocks: data.blocks || [],
      cli: data.cli,
    };

    // Update cache
    memoryCache = resources;
    memoryCacheTime = Date.now();

    return resources;
  } catch (error: any) {
    // If CLI fails, return cached data or empty
    if (memoryCache) {
      return memoryCache;
    }
    
    console.error('Failed to fetch catalog from CLI:', error.message);
    
    // Return minimal fallback
    return {
      themes: [],
      components: [],
      blocks: [],
      cli: {
        name: 'grg',
        version: 'unknown',
        commands: {
          init: { usage: 'grg init [--theme <name>]' },
          addBlock: { usage: 'grg add block <blockName> [fileIds...]', validBlocks: ['auth', 'shell', 'settings'] },
          addComponent: { usage: 'grg add component <componentName>', validComponents: ['file-upload'] },
          list: { usage: 'grg list [--json]' },
        },
      },
    };
  }
}

