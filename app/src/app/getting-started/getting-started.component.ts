import { Component, signal } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal, lucidePackage, lucideDownload, lucideBrain, lucideZap } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-getting-started',
  imports: [HlmCardImports, HlmAlertImports, HlmTabsImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideTerminal, lucidePackage, lucideDownload, lucideBrain, lucideZap })],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p class="text-lg text-muted-foreground">
          Set up your Angular project with GRG Kit components and resources
        </p>
      </div>

      <!-- Tabs for CLI vs MCP -->
      <hlm-tabs tab="cli">
        <hlm-tabs-list class="grid w-full grid-cols-2" aria-label="Usage options">
          <button hlmTabsTrigger="cli">
            <ng-icon hlm name="lucideTerminal" class="mr-2" size="sm" />
            CLI Usage
          </button>
          <button hlmTabsTrigger="mcp">
            <ng-icon hlm name="lucideBrain" class="mr-2" size="sm" />
            MCP Server (AI Assistants)
          </button>
        </hlm-tabs-list>

        <!-- CLI Usage Tab -->
        <div hlmTabsContent="cli">

      <!-- Prerequisites Alert -->
      <div hlmAlert>
        <ng-icon hlm hlmAlertIcon name="lucideTerminal" />
        <h4 hlmAlertTitle>Prerequisites</h4>
        <p hlmAlertDescription>
          Before using GRG Kit resources, you'll need to set up your Angular project with the required dependencies.
        </p>
      </div>

      <!-- Step 1: Install GRG CLI -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideTerminal" size="lg" />
            <h3 hlmCardTitle>1. Install GRG CLI</h3>
          </div>
          <p hlmCardDescription>
            Install the GRG Kit CLI globally
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install GRG CLI:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>pnpm install -g grg-kit-cli</code></pre>
          </div>
        </div>
      </section>

      <!-- GRG Kit Init Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>2. Initialize GRG Kit</h3>
          </div>
          <p hlmCardDescription>
            One command to create an Angular project with Tailwind CSS, Spartan-NG, and theme
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Initialize with default theme:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg init my-app</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Or choose a specific theme:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg init my-app --theme claude</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Then navigate to your project:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>cd my-app</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 What <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init</code> does:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• Creates Angular project with CSS styling</li>
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

      <!-- Add Blocks Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>3. Add Blocks</h3>
          </div>
          <p hlmCardDescription>
            Add pre-built page blocks to your project
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Add authentication pages:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --auth</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add app shell (sidebar, header, content):</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --shell</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add settings page:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --settings</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add multiple blocks at once:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --auth --shell</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add all blocks:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add block --all</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">📦 Available Blocks</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li><strong>auth</strong> - Login, signup, forgot password pages</li>
              <li><strong>shell</strong> - Application shell with sidebar and header</li>
              <li><strong>settings</strong> - Settings page with sidebar navigation</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- List Resources Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>List Available Resources</h3>
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
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init my-app</code> - Create project with theme + all components</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block --auth</code> - Add auth block</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block --shell</code> - Add app shell block</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add block --all</code> - Add all blocks</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg list</code> - See all available resources</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Next Steps -->
      <section hlmCard>
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

        <!-- MCP Server Tab -->
        <div hlmTabsContent="mcp">
          <div class="space-y-8 mt-8">
            <!-- MCP Overview Alert -->
            <div hlmAlert>
              <ng-icon hlm hlmAlertIcon name="lucideBrain" />
              <h4 hlmAlertTitle>AI-Powered Development</h4>
              <p hlmAlertDescription>
                Enable AI assistants (Windsurf, Cursor, Claude Desktop) to automatically discover and use GRG Kit resources.
                The MCP server allows AI to search, suggest, and install components without manual intervention.
              </p>
            </div>

            <!-- Step 1: Install MCP Server -->
            <section hlmCard>
              <div hlmCardHeader>
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucidePackage" size="lg" />
                  <h3 hlmCardTitle>1. Install MCP Server</h3>
                </div>
                <p hlmCardDescription>
                  Install both the CLI and MCP server globally
                </p>
              </div>
              <div hlmCardContent class="space-y-4">
                <div class="space-y-2">
                  <p class="text-sm font-medium">Install globally:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>pnpm install -g grg-kit-cli @grg-kit/mcp-server</code></pre>
                </div>
                <div class="mt-4 p-4 bg-muted/50 rounded-md">
                  <p class="text-sm font-medium mb-2">💡 What gets installed:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg</code> - CLI for manual resource management</li>
                    <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-mcp-server</code> - MCP server for AI integration</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Step 2: Configure AI Assistant -->
            <section hlmCard>
              <div hlmCardHeader>
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideBrain" size="lg" />
                  <h3 hlmCardTitle>2. Configure Your AI Assistant</h3>
                </div>
                <p hlmCardDescription>
                  Add MCP server configuration to your AI assistant
                </p>
              </div>
              <div hlmCardContent class="space-y-4">
                <div class="space-y-2">
                  <p class="text-sm font-medium">For Windsurf:</p>
                  <p class="text-sm text-muted-foreground mb-2">Add to <code class="text-xs bg-muted px-1 py-0.5 rounded">~/.codeium/windsurf/mcp_config.json</code>:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>{{ '{' }}
  "mcpServers": {{ '{' }}
    "grg-kit": {{ '{' }}
      "command": "grg-mcp-server"
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="space-y-2">
                  <p class="text-sm font-medium">For Cursor:</p>
                  <p class="text-sm text-muted-foreground mb-2">Add to <code class="text-xs bg-muted px-1 py-0.5 rounded">~/.cursor/mcp_config.json</code>:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>{{ '{' }}
  "mcpServers": {{ '{' }}
    "grg-kit": {{ '{' }}
      "command": "grg-mcp-server"
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="space-y-2">
                  <p class="text-sm font-medium">For Claude Desktop (macOS):</p>
                  <p class="text-sm text-muted-foreground mb-2">Add to <code class="text-xs bg-muted px-1 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>{{ '{' }}
  "mcpServers": {{ '{' }}
    "grg-kit": {{ '{' }}
      "command": "grg-mcp-server"
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>
              </div>
            </section>

            <!-- Step 3: Generate AI Rules -->
            <section hlmCard>
              <div hlmCardHeader>
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideZap" size="lg" />
                  <h3 hlmCardTitle>3. Generate AI Rules</h3>
                </div>
                <p hlmCardDescription>
                  Create rule files that teach AI about GRG Kit patterns
                </p>
              </div>
              <div hlmCardContent class="space-y-4">
                <div class="space-y-2">
                  <p class="text-sm font-medium">Navigate to your project and run:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>cd your-angular-project

# For Windsurf (default)
grg llm-prompts

# For Cursor
grg llm-prompts --output .cursor/rules

# For other IDEs
grg llm-prompts --output .ai-rules</code></pre>
                </div>

                <div class="mt-4 p-4 bg-muted/50 rounded-md">
                  <p class="text-sm font-medium mb-2">📝 Generated Files:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">design-system.md</code> - GRG Kit design patterns and component usage</li>
                    <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-kit-mcp.md</code> - MCP integration workflow and best practices</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Step 4: Restart IDE -->
            <section hlmCard>
              <div hlmCardHeader>
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideTerminal" size="lg" />
                  <h3 hlmCardTitle>4. Restart Your IDE</h3>
                </div>
                <p hlmCardDescription>
                  Reload to activate MCP server and rules
                </p>
              </div>
              <div hlmCardContent class="space-y-4">
                <p class="text-sm text-muted-foreground">
                  Completely restart your IDE (Windsurf, Cursor, or Claude Desktop) to load the MCP server and generated rules.
                </p>
                <div class="mt-4 p-4 bg-accent/50 rounded-md">
                  <p class="text-sm font-medium mb-2">✅ What This Enables:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li>• AI automatically searches GRG Kit before writing custom code</li>
                    <li>• AI knows about themes, components, blocks, and 56+ examples</li>
                    <li>• AI follows GRG Kit design system patterns</li>
                    <li>• AI can install blocks directly via MCP tools</li>
                    <li>• Faster development with pre-built, tested components</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- How It Works -->
            <section hlmCard>
              <div hlmCardHeader>
                <h3 hlmCardTitle>How It Works</h3>
                <p hlmCardDescription>
                  Understanding the AI-powered workflow
                </p>
              </div>
              <div hlmCardContent>
                <div class="space-y-4">
                  <div class="p-4 bg-muted/50 rounded-md">
                    <pre class="text-sm text-muted-foreground whitespace-pre-wrap">User: "I need a login page"
         ↓
AI reads .windsurf/rules/grg-kit-mcp.md
         ↓
AI calls MCP tool: suggest_resources({{ '{' }} requirement: "login page" {{ '}' }})
         ↓
MCP Server → Returns: block:auth
         ↓
AI calls MCP tool: install_resource({{ '{' }} resource: "auth" {{ '}' }})
         ↓
MCP Server → grg add block --auth → Downloads auth block
         ↓
AI: "I've installed the auth block. Here's how to use it..."</pre>
                  </div>

                  <div class="mt-4 p-4 bg-accent/50 rounded-md">
                    <p class="text-sm font-medium mb-2">🔧 Available MCP Tools:</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">search_ui_resources</code> - Search for components, themes, blocks</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">suggest_resources</code> - Get AI-powered suggestions</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">get_resource_details</code> - View detailed resource info</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">install_resource</code> - Install blocks automatically</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">list_available_resources</code> - Browse catalog</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Testing MCP Integration -->
            <section hlmCard>
              <div hlmCardHeader>
                <h3 hlmCardTitle>Test Your Setup</h3>
                <p hlmCardDescription>
                  Verify MCP integration is working
                </p>
              </div>
              <div hlmCardContent class="space-y-4">
                <div class="space-y-2">
                  <p class="text-sm font-medium">Ask your AI assistant:</p>
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>"Search for GRG Kit button components"</code></pre>
                  <p class="text-sm text-muted-foreground mt-2">
                    The AI should use the <code class="text-xs bg-muted px-1 py-0.5 rounded">search_ui_resources</code> MCP tool automatically.
                  </p>
                </div>

                <div class="mt-4 p-4 bg-muted/50 rounded-md">
                  <p class="text-sm font-medium mb-2">🔍 Troubleshooting:</p>
                  <ul class="text-sm text-muted-foreground space-y-1">
                    <li>• Verify <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-mcp-server</code> is installed: <code class="text-xs bg-muted px-1 py-0.5 rounded">which grg-mcp-server</code></li>
                    <li>• Check MCP config file exists and has valid JSON</li>
                    <li>• Ensure rules are generated in correct directory</li>
                    <li>• Restart IDE completely (not just reload window)</li>
                    <li>• Check IDE logs for MCP connection errors</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </hlm-tabs>
    </div>
  `,
  styles: [],
})
export class GettingStartedComponent {}
