/**
 * Dynamic catalog fetcher with caching for MCP server
 * Fetches catalog.json from GitHub with fallback to inline resources
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO = 'Genesis-Research/grg-kit';
const CATALOG_URL = `https://raw.githubusercontent.com/${REPO}/main/templates/catalog.json`;
const CACHE_FILE = path.join(__dirname, '.catalog-cache.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

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

export interface GRGResources {
  themes: ResourceItem[];
  components: ResourceItem[];
  blocks: ResourceItem[];
}

// In-memory cache
let memoryCache: GRGResources | null = null;
let memoryCacheTime = 0;

// Inline fallback resources
const FALLBACK_RESOURCES: GRGResources = {
  themes: [
    { name: 'amber-minimal', title: 'Amber Minimal', description: 'Warm amber accents', tags: ['minimal', 'warm', 'amber', 'orange'] },
    { name: 'claude', title: 'Claude', description: 'Claude-inspired warm tones', tags: ['warm', 'orange', 'brown', 'claude'] },
    { name: 'clean-slate', title: 'Clean Slate', description: 'Minimal grayscale palette', tags: ['minimal', 'grayscale', 'neutral', 'clean'] },
    { name: 'grg-theme', title: 'GRG Theme', description: 'Default theme with purple/orange accents', tags: ['default', 'purple', 'orange', 'colorful'] },
    { name: 'mocks', title: 'Mocks', description: 'Theme for mockups and prototypes', tags: ['mockup', 'prototype', 'design'] },
    { name: 'modern-minimal', title: 'Modern Minimal', description: 'Contemporary minimal design', tags: ['minimal', 'modern', 'contemporary', 'clean'] },
  ],
  components: [
    { name: 'file-upload', title: 'File Upload', description: 'Drag and drop file upload component', tags: ['file', 'upload', 'form', 'drag-drop'] },
    { name: 'stepper', title: 'Stepper', description: 'Multi-step form component with progress indicator', tags: ['form', 'wizard', 'multi-step', 'progress'] },
  ],
  blocks: [
    { name: 'auth', title: 'Auth Block', description: 'Authentication pages (login, signup, forgot password)', tags: ['auth', 'login', 'signup', 'authentication'] },
    { name: 'settings', title: 'Settings Block', description: 'Settings pages: profile, notifications, security, danger zone', tags: ['settings', 'preferences', 'account', 'profile', 'security'] },
    { name: 'shell', title: 'App Shell Block', description: 'Application shell layouts: sidebar, topnav, collapsible - each with optional footer', tags: ['shell', 'layout', 'sidebar', 'header', 'footer', 'navigation'] },
  ],
};

/**
 * Fetch JSON from URL
 */
function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Read file cache
 */
function readFileCache(): GRGResources | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
      }
    }
  } catch (e) {
    // Cache read failed
  }
  return null;
}

/**
 * Write file cache
 */
function writeFileCache(data: GRGResources): void {
  try {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ timestamp: Date.now(), data }),
      'utf-8'
    );
  } catch (e) {
    // Cache write failed
  }
}

/**
 * Transform catalog to resources format
 */
function transformCatalog(catalog: any): GRGResources {
  return {
    themes: catalog.themes.map((t: any) => ({
      ...t,
      path: `templates/ui/themes/${t.file}`,
      defaultOutput: `src/themes/${t.file}`,
    })),
    components: catalog.components.map((c: any) => ({
      ...c,
      path: `templates/ui/components/${c.name}`,
      defaultOutput: `src/app/components/${c.name}`,
    })),
    blocks: catalog.blocks.map((b: any) => ({
      ...b,
      path: `templates/ui/blocks/${b.name}`,
      defaultOutput: `src/app/blocks/${b.name}`,
    })),
  };
}

/**
 * Fetch catalog with caching
 * Priority: memory cache -> file cache -> network -> fallback
 */
export async function fetchCatalog(forceRefresh = false): Promise<GRGResources> {
  // Check memory cache first
  if (!forceRefresh && memoryCache && Date.now() - memoryCacheTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  // Check file cache
  if (!forceRefresh) {
    const fileCached = readFileCache();
    if (fileCached) {
      memoryCache = fileCached;
      memoryCacheTime = Date.now();
      return fileCached;
    }
  }

  // Fetch from network
  try {
    const catalog = await fetchJson(CATALOG_URL);
    const resources = transformCatalog(catalog);

    // Update caches
    memoryCache = resources;
    memoryCacheTime = Date.now();
    writeFileCache(resources);

    return resources;
  } catch (error) {
    // Try expired file cache
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        return cached.data;
      }
    } catch (e) {
      // Ignore
    }

    // Final fallback
    return FALLBACK_RESOURCES;
  }
}

/**
 * Get resources synchronously (uses cache or fallback)
 */
export function getResourcesSync(): GRGResources {
  if (memoryCache && Date.now() - memoryCacheTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  const fileCached = readFileCache();
  if (fileCached) {
    memoryCache = fileCached;
    memoryCacheTime = Date.now();
    return fileCached;
  }

  return FALLBACK_RESOURCES;
}

export { REPO };
