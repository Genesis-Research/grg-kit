/**
 * Dynamic catalog fetcher with caching
 * Fetches catalog.json from GitHub with fallback to static resources
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO = 'Genesis-Research/grg-kit';
const CATALOG_URL = `https://raw.githubusercontent.com/${REPO}/main/templates/catalog.json`;
const CACHE_FILE = path.join(__dirname, '.catalog-cache.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// In-memory cache for current session
let memoryCache = null;
let memoryCacheTime = 0;

/**
 * Fetch JSON from URL
 */
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
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
function readFileCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
      }
    }
  } catch (e) {
    // Cache read failed, ignore
  }
  return null;
}

/**
 * Write file cache
 */
function writeFileCache(data) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({
      timestamp: Date.now(),
      data
    }), 'utf-8');
  } catch (e) {
    // Cache write failed, ignore
  }
}

/**
 * Get static fallback resources
 */
function getStaticFallback() {
  try {
    const { RESOURCES } = require('./resources');
    return RESOURCES;
  } catch (e) {
    return { themes: [], components: [], blocks: [] };
  }
}

/**
 * Fetch catalog with caching
 * Priority: memory cache -> file cache -> network -> static fallback
 */
async function fetchCatalog(options = {}) {
  const { forceRefresh = false, silent = false } = options;

  // Check memory cache first (fastest)
  if (!forceRefresh && memoryCache && (Date.now() - memoryCacheTime < CACHE_TTL_MS)) {
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
    
    // Transform to match expected format
    const resources = {
      themes: catalog.themes.map(t => ({
        ...t,
        path: `templates/ui/themes/${t.file}`,
        defaultOutput: `src/themes/${t.file}`
      })),
      components: catalog.components.map(c => ({
        ...c,
        path: `templates/ui/components/${c.name}`,
        defaultOutput: `src/app/components/${c.name}`
      })),
      blocks: catalog.blocks.map(b => ({
        ...b,
        path: `templates/ui/blocks/${b.name}`,
        defaultOutput: `src/app/blocks/${b.name}`
      }))
    };

    // Update caches
    memoryCache = resources;
    memoryCacheTime = Date.now();
    writeFileCache(resources);

    return resources;
  } catch (error) {
    if (!silent) {
      console.warn(`Warning: Could not fetch catalog (${error.message}), using cached/static resources`);
    }
    
    // Try file cache even if expired
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        return cached.data;
      }
    } catch (e) {
      // Ignore
    }

    // Final fallback to static resources
    return getStaticFallback();
  }
}

/**
 * Get resources synchronously (uses cache or static fallback)
 */
function getResourcesSync() {
  // Check memory cache
  if (memoryCache && (Date.now() - memoryCacheTime < CACHE_TTL_MS)) {
    return memoryCache;
  }

  // Check file cache
  const fileCached = readFileCache();
  if (fileCached) {
    memoryCache = fileCached;
    memoryCacheTime = Date.now();
    return fileCached;
  }

  // Static fallback
  return getStaticFallback();
}

/**
 * Clear all caches
 */
function clearCache() {
  memoryCache = null;
  memoryCacheTime = 0;
  try {
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
    }
  } catch (e) {
    // Ignore
  }
}

module.exports = {
  fetchCatalog,
  getResourcesSync,
  clearCache,
  REPO
};
