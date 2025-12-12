import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal, lucideDownload, lucideBrain, lucideZap, lucideBot } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-getting-started',
  imports: [HlmCardImports, HlmAlertImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideTerminal, lucideDownload, lucideBrain, lucideZap, lucideBot })],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p class="text-lg text-muted-foreground">
          Set up your Angular project with GRG Kit using AI assistants
        </p>
      </div>

      <!-- Prerequisites -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Prerequisites</h3>
          <p hlmCardDescription>Required versions for GRG Kit</p>
        </div>
        <div hlmCardContent>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="font-medium">Node.js:</span>
              <code class="bg-muted px-2 py-0.5 rounded">v20.19+</code> or <code class="bg-muted px-2 py-0.5 rounded">v22.12+</code>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-medium">Angular:</span>
              <code class="bg-muted px-2 py-0.5 rounded">v21+</code>
            </li>
          </ul>
        </div>
      </section>

      <!-- MCP-First Alert -->
      <div hlmAlert>
        <ng-icon hlm hlmAlertIcon name="lucideBot" />
        <h4 hlmAlertTitle>AI-First Workflow</h4>
        <p hlmAlertDescription>
          GRG Kit is designed to work with AI assistants via MCP. After initial setup, your AI assistant will handle adding themes, blocks, and components for you.
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
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg</code> - CLI for initializing projects</li>
              <li>• <code class="text-xs bg-muted px-1 py-0.5 rounded">grg-mcp-server</code> - MCP server for AI assistant integration</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Step 2: Initialize GRG Kit -->
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
            <p class="text-sm font-medium">Create an Angular project and initialize:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>ng new my-app --style=css
cd my-app
grg init</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 What <code class="text-xs bg-muted px-1 py-0.5 rounded">grg init</code> does:</p>
            <ul class="text-sm text-muted-foreground space-y-1">
              <li>• Installs Tailwind CSS v4 with PostCSS</li>
              <li>• Installs and configures Spartan-NG CLI</li>
              <li>• Runs <code class="text-xs bg-muted px-1 py-0.5 rounded">ng g @spartan-ng/cli:ui all</code> to install all UI components</li>
              <li>• Downloads 56+ Spartan-NG examples to <code class="text-xs bg-muted px-1 py-0.5 rounded">libs/examples</code></li>
              <li>• Downloads the default theme</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Step 3: Configure MCP Server -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideBrain" size="lg" />
            <h3 hlmCardTitle>3. Configure MCP Server</h3>
          </div>
          <p hlmCardDescription>
            Connect your AI assistant to GRG Kit resources
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-medium">Generate AI rules:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># For Windsurf
grg llm-setup

# For Claude Code
grg llm-setup --output .claude</code></pre>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">🔧 Add MCP Server to your IDE:</p>
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
        </div>
      </section>

      <!-- Step 4: Use AI to Add Resources -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideBot" size="lg" />
            <h3 hlmCardTitle>4. Ask Your AI Assistant</h3>
          </div>
          <p hlmCardDescription>
            Your AI will use MCP to add themes, blocks, and components
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-3">💬 Example Prompts:</p>
            <ul class="text-sm text-muted-foreground space-y-3">
              <li class="p-2 bg-muted rounded-md">
                <span class="font-medium text-foreground">"Add a login page"</span>
                <p class="text-xs mt-1">→ AI installs auth block with login component</p>
              </li>
              <li class="p-2 bg-muted rounded-md">
                <span class="font-medium text-foreground">"Create a dashboard with sidebar"</span>
                <p class="text-xs mt-1">→ AI installs shell block with sidebar layout</p>
              </li>
              <li class="p-2 bg-muted rounded-md">
                <span class="font-medium text-foreground">"Switch to the claude theme"</span>
                <p class="text-xs mt-1">→ AI downloads and applies the claude theme</p>
              </li>
              <li class="p-2 bg-muted rounded-md">
                <span class="font-medium text-foreground">"Add a file upload component"</span>
                <p class="text-xs mt-1">→ AI installs the grg-file-upload component</p>
              </li>
              <li class="p-2 bg-muted rounded-md">
                <span class="font-medium text-foreground">"Add settings pages"</span>
                <p class="text-xs mt-1">→ AI installs settings block with profile, security, notifications</p>
              </li>
            </ul>
          </div>

          <div class="mt-4 p-4 bg-muted/50 rounded-md">
            <p class="text-sm font-medium mb-2">📦 Available Resources:</p>
            <ul class="text-sm text-muted-foreground space-y-2">
              <li><strong>Themes:</strong> grg-theme, claude, clean-slate, modern-minimal, amber-minimal, mocks</li>
              <li><strong>Blocks:</strong> auth (login, register, forgot-password), shell (sidebar, topnav, collapsible), settings (profile, security, notification, danger-zone)</li>
              <li><strong>Components:</strong> file-upload</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- What AI Can Do -->
      <section hlmCard class="mt-6">
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucideZap" size="lg" />
            <h3 hlmCardTitle>What Your AI Assistant Can Do</h3>
          </div>
          <p hlmCardDescription>
            With MCP configured, your AI has full access to GRG Kit
          </p>
        </div>
        <div hlmCardContent>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Search resources</strong> - Find themes, blocks, and components</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Install blocks</strong> - Add auth, shell, settings pages</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Switch themes</strong> - Change the color palette instantly</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Add components</strong> - Install GRG Kit components</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Follow design system</strong> - Use Spartan-NG patterns correctly</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span><strong>Use semantic colors</strong> - Never use raw Tailwind colors</span>
            </li>
          </ul>
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
              <span>Explore <strong>GRG Components</strong> for custom components</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  `,
  styles: [],
})
export class GettingStartedComponent {}
