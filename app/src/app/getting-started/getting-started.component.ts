import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal, lucidePackage, lucideDownload, lucideBrain, lucideZap } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-getting-started',
  imports: [HlmCardImports, HlmAlertImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideTerminal, lucidePackage, lucideDownload, lucideBrain, lucideZap })],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p class="text-lg text-muted-foreground">
          Set up your Angular project with GRG Kit components and resources
        </p>
      </div>

      <!-- Prerequisites Alert -->
      <div hlmAlert>
        <ng-icon hlm hlmAlertIcon name="lucideTerminal" />
        <h4 hlmAlertTitle>Prerequisites</h4>
        <p hlmAlertDescription>
          Before using GRG Kit resources, you'll need to set up your Angular project with the required dependencies.
        </p>
      </div>

      <!-- Step 1: Install GRG CLI & MCP Server -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideTerminal" size="lg" />
            <h3 hlmCardTitle>1. Install GRG CLI & MCP Server</h3>
          </div>
          <p hlmCardDescription>
            Install the CLI and MCP server for AI assistant integration
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install both globally:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install -g grg-kit-cli grg-kit-mcp-server</code></pre>
          </div>
          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 What gets installed:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg</code> - CLI for initializing projects and adding blocks</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-mcp-server</code> - MCP server for AI assistant integration</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- GRG Kit Init Section -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>2. Initialize GRG Kit</h3>
          </div>
          <p hlmCardDescription>
            Install Tailwind CSS, Spartan-NG, and theme in your Angular project
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Create an Angular project (if you don't have one) and initialize:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>ng new my-app --style=css
cd my-app
grg init</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Or choose a specific theme:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg init --theme claude</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 What <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init</code> does:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• Installs Tailwind CSS v4 with PostCSS</li>
              <li>• Creates <code class="text-xs bg-muted px-1 py-0.5 rounded">.postcssrc.json</code> configuration</li>
              <li>• Installs and configures Spartan-NG CLI</li>
              <li>• Runs <code class="text-xs bg-muted px-1 py-0.5 rounded">ng g @spartan-ng/cli:ui all</code> to install all UI components</li>
              <li>• Downloads 56+ Spartan-NG examples to <code class="text-xs bg-muted px-1 py-0.5 rounded">libs/examples</code></li>
              <li>• Downloads the selected theme to <code class="text-xs bg-muted px-1 py-0.5 rounded">src/themes</code></li>
              <li>• Updates <code class="text-xs bg-muted px-1 py-0.5 rounded">src/styles.css</code> with theme import</li>
            </ul>
          </div>

          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">📋 Available Themes</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li><strong>grg-theme</strong> - Default theme with purple/orange accents</li>
              <li><strong>claude</strong> - Claude-inspired warm tones</li>
              <li><strong>clean-slate</strong> - Minimal grayscale palette</li>
              <li><strong>modern-minimal</strong> - Contemporary minimal design</li>
              <li><strong>amber-minimal</strong> - Warm amber accents</li>
              <li><strong>mocks</strong> - Theme for mockups and prototypes</li>
            </ul>
            <p class="text-sm text-muted-foreground mt-2">
              Browse the <strong>Colors</strong> tab to preview each theme's palette.
            </p>
          </div>
        </div>
      </section>

      <!-- LLM Setup Section -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideBrain" size="lg" />
            <h3 hlmCardTitle>3. Setup AI Assistant (Optional)</h3>
          </div>
          <p hlmCardDescription>
            Configure MCP server and generate rules for AI assistants
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Generate AI rules and configure MCP:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># For Windsurf (default)
grg llm-setup

# For Claude Code
grg llm-setup --output .claude</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">🔧 Configure MCP Server in your IDE:</p>
            <div class="space-y-3 text-sm text-muted-foreground">
              <div>
                <p class="font-medium text-foreground">Windsurf:</p>
                <p class="text-xs">Add to <code class="bg-muted px-1 py-0.5 rounded">~/.codeium/windsurf/mcp_config.json</code></p>
              </div>
              <div>
                <p class="font-medium text-foreground">Claude Code:</p>
                <p class="text-xs"><code class="bg-muted px-1 py-0.5 rounded">claude mcp add grg-kit -s user -- grg-mcp-server</code></p>
              </div>
              <div>
                <p class="font-medium text-foreground">Claude Desktop:</p>
                <p class="text-xs">Add to <code class="bg-muted px-1 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code></p>
              </div>
              <pre class="bg-muted p-3 rounded-md overflow-x-auto text-xs mt-2"><code>{{ '{' }}
  "mcpServers": {{ '{' }}
    "grg-kit": {{ '{' }}
      "command": "grg-mcp-server"
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
            </div>
          </div>

          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">✅ What This Enables:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• AI automatically searches GRG Kit before writing custom code</li>
              <li>• AI knows about themes, components, blocks, and 56+ examples</li>
              <li>• AI can install blocks directly via MCP tools</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Add Blocks Section -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>4. Add Blocks</h3>
          </div>
          <p hlmCardDescription>
            Add pre-built page blocks to your project
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Add entire block (all files):</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block auth      # All auth files
grg add block shell     # All shell layouts
grg add block settings  # All settings pages</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add specific files only:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block auth login              # Just login
grg add block auth login register     # Login and register
grg add block shell sidebar           # Just sidebar shell
grg add block shell topnav topnav-footer  # Topnav variants</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add all blocks:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --all</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">📦 Available Blocks & Files</p>
            <ul class="text-sm text-muted-foreground space-y-2">
              <li><strong>auth</strong> - <code class="text-xs bg-muted px-1 py-0.5 rounded">login</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">register</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">forgot-password</code></li>
              <li><strong>shell</strong> - <code class="text-xs bg-muted px-1 py-0.5 rounded">sidebar</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">sidebar-footer</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">topnav</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">topnav-footer</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">collapsible</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">collapsible-footer</code></li>
              <li><strong>settings</strong> - <code class="text-xs bg-muted px-1 py-0.5 rounded">profile</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">security</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">notification</code>, <code class="text-xs bg-muted px-1 py-0.5 rounded">danger-zone</code></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- List Resources Section -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>5. List Available Resources</h3>
          </div>
          <p hlmCardDescription>
            Browse what's available in GRG Kit
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">List all resources:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg list</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">List specific categories:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg list blocks
grg list themes</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 Quick Reference</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init</code> - Initialize GRG Kit in current Angular project</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg llm-setup</code> - Generate AI assistant rules</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block auth</code> - Add all auth files</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block auth login</code> - Add just login</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block shell sidebar</code> - Add just sidebar shell</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block --all</code> - Add all blocks</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg list</code> - See all available resources</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Next Steps -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <h3 hlmCardTitle>Next Steps</h3>
          <p hlmCardDescription>Explore the available resources</p>
        </div>
        <div hlmCardContent>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-primary">→</span>
              <span>Browse <strong>Spartan Components</strong> for pre-built UI examples</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">→</span>
              <span>Check out <strong>Blocks</strong> for page templates (auth, shell, settings)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">→</span>
              <span>Explore <strong>GRG Components</strong> for custom components with the <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-</code> prefix</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">→</span>
              <span>View <strong>Colors</strong> to see the theme color palette</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">→</span>
              <span>Review <strong>Typography</strong> for text styling examples</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  `,
  styles: [],
})
export class GettingStartedComponent {}
