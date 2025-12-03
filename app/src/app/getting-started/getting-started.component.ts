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

      <!-- Step 1: Angular CLI -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideTerminal" size="lg" />
            <h3 hlmCardTitle>1. Install Angular CLI</h3>
          </div>
          <p hlmCardDescription>
            Install the Angular CLI globally and create a new project with CSS as the default stylesheet
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install Angular CLI:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install -g @angular/cli@latest</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Create a new Angular project:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>ng new my-app --style=css --routing
cd my-app</code></pre>
          </div>
        </div>
      </section>

      <!-- Step 2: Tailwind CSS -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucidePackage" size="lg" />
            <h3 hlmCardTitle>2. Install Tailwind CSS</h3>
          </div>
          <p hlmCardDescription>
            Add Tailwind CSS for utility-first styling
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install Tailwind CSS and PostCSS plugin:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install tailwindcss @tailwindcss/postcss postcss --force</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Create <code class="text-sm bg-muted px-1 py-0.5 rounded">.postcssrc.json</code> in your project root:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>{{ '{' }}
  "plugins": {{ '{' }}
    "@tailwindcss/postcss": {{ '{' }}{{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Add to your <code class="text-sm bg-muted px-1 py-0.5 rounded">src/styles.css</code>:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>@import "tailwindcss";</code></pre>
          </div>
        </div>
      </section>

      <!-- Step 3: Spartan-NG -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucidePackage" size="lg" />
            <h3 hlmCardTitle>3. Install Spartan-NG</h3>
          </div>
          <p hlmCardDescription>
            Set up the Spartan-NG component library for accessible, customizable UI components
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install Spartan-NG CLI:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install -D @spartan-ng/cli</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Initialize Spartan-NG:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx ng g @spartan-ng/cli:init</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Install specific components:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx ng g @spartan-ng/cli:ui button
npx ng g @spartan-ng/cli:ui card
npx ng g @spartan-ng/cli:ui dialog</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Or install all components at once:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx ng g @spartan-ng/cli:ui --all</code></pre>
          </div>
          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm">
              For more Spartan-NG components, visit 
              <a href="https://www.spartan.ng/" target="_blank" class="text-primary hover:underline">
                spartan-ng.dev
              </a>
            </p>
          </div>
        </div>
      </section>

      <!-- Theming Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>4. Add a GRG Kit Theme</h3>
          </div>
          <p hlmCardDescription>
            Pull a pre-built theme with Tailwind CSS v4, Spartan-NG integration, and dark mode support
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Install GRG CLI:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install -g grg-kit-cli</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Option 1: Interactive Mode (Recommended):</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># Launch interactive menu
grg
</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Option 2: Direct Commands:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># Initialize with default theme
grg init

# Or choose a specific theme
grg init --theme claude</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 What <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init</code> does:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• Creates <code class="text-xs bg-muted px-1 py-0.5 rounded">src/themes</code> directory</li>
              <li>• Downloads the selected theme</li>
              <li>• Updates <code class="text-xs bg-muted px-1 py-0.5 rounded">src/styles.css</code> with theme import</li>
            </ul>
          </div>

          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">📋 Available Themes</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li><strong>claude.css</strong> - Claude-inspired warm tones</li>
              <li><strong>grg-theme.css</strong> - Default theme with purple/orange accents</li>
              <li><strong>clean-slate.css</strong> - Minimal grayscale palette</li>
              <li><strong>modern-minimal.css</strong> - Contemporary minimal design</li>
              <li><strong>amber-minimal.css</strong> - Warm amber accents</li>
              <li><strong>mocks.css</strong> - Theme for mockups and prototypes</li>
            </ul>
            <p class="text-sm text-muted-foreground mt-2">
              Browse the <strong>Colors</strong> tab to preview each theme's palette.
            </p>
          </div>
        </div>
      </section>

      <!-- Spartan Examples Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>5. Pull Spartan-NG Examples (Optional)</h3>
          </div>
          <p hlmCardDescription>
            Download comprehensive component examples for reference and learning
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Pull all Spartan-NG examples:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add examples:all</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Or pull specific component examples:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># Pull button examples
grg add examples:button

# Pull dialog examples
grg add examples:dialog

# Pull form-field examples
grg add examples:form-field</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">List all available examples:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg list examples</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">📚 What's Included</p>
            <p class="text-sm text-muted-foreground mb-2">
              Examples for all Spartan-NG components including variants, usage patterns, and best practices.
              Perfect for developers and LLMs to understand component implementation.
            </p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• Complete working code for each component</li>
              <li>• Import patterns and template syntax</li>
              <li>• All available variants and configurations</li>
              <li>• 50+ component examples ready to reference</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Usage Section -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideDownload" size="lg" />
            <h3 hlmCardTitle>Using GRG Kit Components</h3>
          </div>
          <p hlmCardDescription>
            Pull individual components and layouts into your project
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Pull a component:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add component:stepper</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Pull a layout:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>grg add layout:dashboard</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">List all available resources:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># List all categories
grg list

# List specific category
grg list components
grg list layouts
grg list themes</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 Quick Commands</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add theme:claude</code> - Add a theme</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add component:stepper</code> - Add a component</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg add layout:dashboard</code> - Add a layout</li>
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
              <span>Check out <strong>Layouts</strong> for page templates and patterns</span>
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
                  <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install -g grg-kit-cli @grg-kit/mcp-server</code></pre>
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
                    <li>• AI knows about 60+ available resources (themes, components, layouts, examples)</li>
                    <li>• AI follows GRG Kit design system patterns</li>
                    <li>• AI can install resources directly via MCP tools</li>
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
                    <pre class="text-sm text-muted-foreground whitespace-pre-wrap">User: "I need a button component"
         ↓
AI reads .windsurf/rules/grg-kit-mcp.md
         ↓
AI calls MCP tool: search_ui_resources({{ '{' }} query: "button" {{ '}' }})
         ↓
MCP Server → grg metadata → Returns: examples:button
         ↓
AI calls MCP tool: install_resource({{ '{' }} resource: "examples:button" {{ '}' }})
         ↓
MCP Server → grg add examples:button → Downloads resource
         ↓
AI: "I've installed button examples. Here's how to use them..."</pre>
                  </div>

                  <div class="mt-4 p-4 bg-accent/50 rounded-md">
                    <p class="text-sm font-medium mb-2">🔧 Available MCP Tools:</p>
                    <ul class="text-sm text-muted-foreground space-y-1">
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">search_ui_resources</code> - Search for components, themes, layouts</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">suggest_resources</code> - Get AI-powered suggestions</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">get_resource_details</code> - View detailed resource info</li>
                      <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">install_resource</code> - Install resources automatically</li>
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
