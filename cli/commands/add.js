const degit = require('degit');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { fetchCatalog, REPO } = require('../config/catalog-fetcher');

/**
 * Add command - downloads blocks or specific block files
 * Format: grg add block <blockName> [fileIds...]
 * Examples:
 *   grg add block auth                    # All auth files
 *   grg add block auth login register     # Only login and register
 *   grg add block shell sidebar           # Only sidebar shell
 *   grg add block --all                   # All blocks with all files
 */
async function add(blockName, fileIds, options) {
  // Fetch catalog dynamically (with caching)
  const spinner = ora('Fetching catalog...').start();
  const RESOURCES = await fetchCatalog({ silent: true });
  spinner.stop();

  // Handle --all flag (download everything)
  if (options.all) {
    console.log(chalk.bold.cyan(`\n📦 Adding all blocks\n`));
    
    for (const block of RESOURCES.blocks) {
      await downloadBlock(block, null, options.output);
    }
    
    console.log(chalk.bold.green('✨ Done!'));
    return;
  }

  // Validate block name
  if (!blockName) {
    showUsage(RESOURCES);
    process.exit(1);
  }

  const block = RESOURCES.blocks.find(b => b.name === blockName);
  if (!block) {
    console.error(chalk.red(`\nError: Block "${blockName}" not found`));
    console.log(chalk.yellow('\nAvailable blocks:'));
    RESOURCES.blocks.forEach(b => {
      console.log(chalk.cyan(`  ${b.name}`), chalk.gray(`- ${b.description}`));
    });
    process.exit(1);
  }

  // Validate file IDs if provided
  if (fileIds && fileIds.length > 0) {
    const invalidFiles = fileIds.filter(id => !block.files?.find(f => f.id === id));
    if (invalidFiles.length > 0) {
      console.error(chalk.red(`\nError: Invalid file(s) for ${blockName}: ${invalidFiles.join(', ')}`));
      console.log(chalk.yellow('\nAvailable files:'));
      block.files?.forEach(f => {
        console.log(chalk.cyan(`  ${f.id}`), chalk.gray(`- ${f.title}`));
      });
      process.exit(1);
    }
  }

  await downloadBlock(block, fileIds, options.output);
  console.log(chalk.bold.green('✨ Done!'));
}

/**
 * Download a block (all files or specific files)
 */
async function downloadBlock(block, fileIds, customOutput) {
  const downloadSpinner = ora();
  
  // If no specific files requested, or block has no files array, download entire block
  if (!fileIds || fileIds.length === 0 || !block.files || block.files.length === 0) {
    const outputPath = customOutput 
      ? `${customOutput}/${block.name}` 
      : block.defaultOutput;

    downloadSpinner.start(`Downloading ${block.title}...`);

    try {
      const emitter = degit(`${REPO}/${block.path}`, {
        cache: false,
        force: true,
        verbose: false,
      });

      await emitter.clone(outputPath);

      downloadSpinner.succeed(chalk.green(`✓ ${block.title} added`));
      console.log(chalk.gray(`  Location: ${outputPath}`));
      
      if (block.dependencies && block.dependencies.length > 0) {
        console.log(chalk.gray(`  Dependencies: ${block.dependencies.join(', ')}`));
      }
      console.log();

    } catch (error) {
      downloadSpinner.fail(chalk.red(`Failed to download ${block.title}`));
      console.error(chalk.red(error.message));
    }
    return;
  }

  // Download specific files
  const filesToDownload = block.files.filter(f => fileIds.includes(f.id));
  const outputDir = customOutput || block.defaultOutput;

  console.log(chalk.bold.cyan(`\n📦 Adding ${filesToDownload.length} file(s) from ${block.title}\n`));

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  for (const file of filesToDownload) {
    downloadSpinner.start(`Downloading ${file.title}...`);

    try {
      const fileUrl = `https://raw.githubusercontent.com/${REPO}/main/${block.path}/${file.file}`;
      const outputPath = path.join(outputDir, file.file);
      
      await downloadFile(fileUrl, outputPath);

      downloadSpinner.succeed(chalk.green(`✓ ${file.title} added`));
      console.log(chalk.gray(`  Location: ${outputPath}`));

    } catch (error) {
      downloadSpinner.fail(chalk.red(`Failed to download ${file.title}`));
      console.error(chalk.red(error.message));
    }
  }

  if (block.dependencies && block.dependencies.length > 0) {
    console.log(chalk.gray(`\nDependencies: ${block.dependencies.join(', ')}`));
  }
  console.log();
}

/**
 * Download a single file from URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        https.get(res.headers.location, (res2) => {
          handleResponse(res2, outputPath, resolve, reject);
        }).on('error', reject);
      } else {
        handleResponse(res, outputPath, resolve, reject);
      }
    }).on('error', reject);
  });
}

function handleResponse(res, outputPath, resolve, reject) {
  if (res.statusCode !== 200) {
    reject(new Error(`HTTP ${res.statusCode}`));
    return;
  }

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', async () => {
    try {
      await fs.writeFile(outputPath, data, 'utf-8');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Show usage help
 */
function showUsage(RESOURCES) {
  console.log(chalk.yellow('\nUsage: grg add block <blockName> [fileIds...]\n'));
  console.log(chalk.bold('Examples:'));
  console.log(chalk.cyan('  grg add block auth'), chalk.gray('                 # All auth files'));
  console.log(chalk.cyan('  grg add block auth login'), chalk.gray('           # Only login'));
  console.log(chalk.cyan('  grg add block auth login register'), chalk.gray('  # Login and register'));
  console.log(chalk.cyan('  grg add block shell sidebar'), chalk.gray('        # Only sidebar shell'));
  console.log(chalk.cyan('  grg add block --all'), chalk.gray('                # All blocks'));
  
  console.log(chalk.bold('\nAvailable blocks:'));
  RESOURCES.blocks.forEach(b => {
    console.log(chalk.cyan(`  ${b.name}`), chalk.gray(`- ${b.description}`));
    if (b.files && b.files.length > 0) {
      console.log(chalk.gray(`    Files: ${b.files.map(f => f.id).join(', ')}`));
    }
  });
  
  console.log(chalk.gray('\nRun'), chalk.cyan('grg list blocks'), chalk.gray('for more details'));
}

module.exports = { add };
