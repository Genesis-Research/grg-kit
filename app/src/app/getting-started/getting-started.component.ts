import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal, lucidePackage, lucideDownload } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-getting-started',
  imports: [HlmCardImports, HlmAlertImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideTerminal, lucidePackage, lucideDownload })],
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
            <p class="text-sm font-medium">Option 1: Using GRG CLI (Recommended):</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># Install CLI globally
npm install -g grg-kit-cli

# Initialize with default theme
grg init

# Or choose a specific theme
grg init --theme claude</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Option 2: Using degit directly:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>mkdir -p src/themes</code></pre>
          </div>
          
          <div class="space-y-2">
            <p class="text-sm font-medium">Pull a theme using degit:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># GRG default theme (purple/orange accents)
npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/grg-theme.css src/themes/grg-theme.css

# Or choose another theme:
# npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/claude.css src/themes/claude.css
# npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/clean-slate.css src/themes/clean-slate.css
# npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/modern-minimal.css src/themes/modern-minimal.css
# npx degit gh:Genesis-Research/grg-kit/templates/ui/themes/amber-minimal.css src/themes/amber-minimal.css</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Update your <code class="text-sm bg-muted px-1 py-0.5 rounded">src/styles.css</code>:</p>
            <div class="bg-muted p-4 rounded-md space-y-2">
              <p class="text-xs text-muted-foreground">Remove the default Spartan styles.css and import the GRG Kit theme:</p>
              <pre class="overflow-x-auto"><code>@import "@angular/cdk/overlay-prebuilt.css";
@import "tailwindcss";
@import "@spartan-ng/brain/hlm-tailwind-preset.css";

@import './themes/grg-theme.css';</code></pre>
            </div>
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
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx degit gh:Genesis-Research/grg-kit/templates/spartan-examples src/app/spartan-examples</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Or pull specific component examples:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code># Pull button examples
npx degit gh:Genesis-Research/grg-kit/templates/spartan-examples/components/(button) src/app/examples/button

# Pull dialog examples
npx degit gh:Genesis-Research/grg-kit/templates/spartan-examples/components/(dialog) src/app/examples/dialog</code></pre>
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
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx degit gh:Genesis-Research/grg-kit/templates/ui/components/stepper src/app/components/stepper</code></pre>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Pull a layout:</p>
            <pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>npx degit gh:Genesis-Research/grg-kit/templates/ui/layouts/dashboard src/app/layouts/dashboard</code></pre>
          </div>
          <div class="mt-4 p-4 bg-accent/50 rounded-md">
            <p class="text-sm font-medium mb-2">💡 Coming Soon</p>
            <p class="text-sm text-muted-foreground">
              Detailed instructions for downloading individual components and layouts using degit will be added soon.
              Browse the available resources in the navigation menu above.
            </p>
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
  `,
  styles: [],
})
export class GettingStartedComponent {}
