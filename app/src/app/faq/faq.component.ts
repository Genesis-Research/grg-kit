import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { 
  lucideChevronDown, 
  lucideHelpCircle, 
  lucideGitCompare,
  lucideLayers,
  lucideShield,
  lucideZap,
  lucideCode
} from '@ng-icons/lucide';

@Component({
  selector: 'app-faq',
  imports: [HlmAccordionImports, NgIcon, HlmIconImports, HlmCardImports, HlmBadgeImports],
  providers: [provideIcons({ 
    lucideChevronDown, 
    lucideHelpCircle, 
    lucideGitCompare,
    lucideLayers,
    lucideShield,
    lucideZap,
    lucideCode
  })],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <ng-icon hlm name="lucideHelpCircle" size="lg" class="text-primary" />
          <h1 class="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        </div>
        <p class="text-lg text-muted-foreground">
          Learn about the design decisions and architecture behind GRG Kit
        </p>
      </div>

      <hlm-accordion class="w-full">
        <!-- Q1: Why Spartan-NG -->
        <hlm-accordion-item id="spartan-vs-others">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideGitCompare" size="sm" class="text-primary" />
                <span>What makes Spartan-NG different from Material or PrimeNG?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>Material and PrimeNG are component libraries</strong> - they provide pre-built components with fixed styling and behavior. While powerful, they come with trade-offs:
              </p>
              <ul class="space-y-2 ml-4">
                <li>• <strong>Limited customization</strong> - Overriding styles often requires fighting specificity wars</li>
                <li>• <strong>Bundle size</strong> - You ship the entire library even if you only use a few components</li>
                <li>• <strong>Design constraints</strong> - Your app looks like "another Material app"</li>
                <li>• <strong>Update friction</strong> - Breaking changes in the library affect your entire app</li>
              </ul>
              <p>
                <strong>Spartan-NG is a component toolkit</strong> - it provides the building blocks and patterns, but you own the code. This follows the <strong>shadcn philosophy</strong>: copy the source code into your project instead of installing a package.
              </p>
              <p class="text-muted-foreground italic">
                Think of it as the difference between renting an apartment (Material/PrimeNG) vs. owning a house (Spartan-NG). You have full control to modify, extend, and customize without constraints.
              </p>

              <!-- Code Comparison -->
              <div class="mt-6 space-y-3">
                <p class="font-semibold text-foreground">Code Comparison:</p>
                
                <div class="space-y-3">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span hlmBadge variant="secondary">Material</span>
                      <span class="text-xs text-muted-foreground">Dependency-based</span>
                    </div>
                    <pre class="bg-muted p-3 rounded-md overflow-x-auto text-xs"><code>// Install dependency
npm install @angular/material

// Import from node_modules
import {{ '{' }} MatButtonModule {{ '}' }} from '@angular/material/button';

// Use pre-styled component
&lt;button mat-raised-button color="primary"&gt;Click me&lt;/button&gt;

// Customization requires overriding
::ng-deep .mat-raised-button {{ '{' }}
  background-color: custom-color !important;
{{ '}' }}</code></pre>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span hlmBadge variant="default">Spartan-NG</span>
                      <span class="text-xs text-muted-foreground">Code ownership</span>
                    </div>
                    <pre class="bg-muted p-3 rounded-md overflow-x-auto text-xs"><code>// Copy component to your project
ng g @spartan-ng/cli:ui button

// Import from YOUR codebase
import {{ '{' }} HlmButtonImports {{ '}' }} from '@spartan-ng/helm/button';

// Use and customize freely
&lt;button hlmBtn variant="default"&gt;Click me&lt;/button&gt;

// Customization is direct - edit the source
// File: libs/ui/button/src/lib/hlm-button.ts
class: 'bg-custom-color hover:bg-custom-color-dark'</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q2: shadcn Principles -->
        <hlm-accordion-item id="shadcn-principles">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideCode" size="sm" class="text-primary" />
                <span>What are shadcn principles and why are they better?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>shadcn/ui</strong> revolutionized React component development with a simple insight: <em>What if components were yours to own, not dependencies to manage?</em>
              </p>
              
              <div class="space-y-3">
                <div>
                  <p class="font-semibold text-foreground">Core Principles:</p>
                  <ul class="space-y-2 ml-4 mt-2">
                    <li>• <strong>Copy, don't install</strong> - Components live in your codebase, not node_modules</li>
                    <li>• <strong>Customize freely</strong> - Modify any component without workarounds</li>
                    <li>• <strong>Composable primitives</strong> - Build complex UIs from simple, accessible building blocks</li>
                    <li>• <strong>Styling freedom</strong> - Use Tailwind CSS for utility-first styling</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-foreground">Why This Matters:</p>
                  <ul class="space-y-2 ml-4 mt-2">
                    <li>• <strong>No version lock-in</strong> - Update components individually, not the entire library</li>
                    <li>• <strong>Zero breaking changes</strong> - You control when and how to update</li>
                    <li>• <strong>Perfect customization</strong> - Change anything without fighting the framework</li>
                    <li>• <strong>Learn by reading</strong> - The source code is right there in your project</li>
                  </ul>
                </div>
              </div>

              <p class="text-muted-foreground italic">
                Spartan-NG brings these principles to Angular. It's not just "another UI library" - it's a fundamentally different approach to building UIs.
              </p>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q3: Brain/Helm Architecture -->
        <hlm-accordion-item id="brain-helm">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideLayers" size="sm" class="text-primary" />
                <span>What is the Brain/Helm architecture pattern?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                Spartan-NG uses a unique <strong>two-layer architecture</strong> that separates behavior from presentation:
              </p>

              <div class="space-y-4">
                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">🧠 Brain Layer (<code class="text-xs bg-background px-1 py-0.5 rounded">@spartan-ng/brain</code>)</p>
                  <ul class="space-y-1 ml-4">
                    <li>• <strong>Unstyled behavioral components</strong></li>
                    <li>• Handles accessibility (ARIA patterns)</li>
                    <li>• Manages keyboard navigation</li>
                    <li>• Controls component state and logic</li>
                    <li>• Based on Radix UI primitives (battle-tested patterns)</li>
                  </ul>
                </div>

                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">⚔️ Helm Layer (<code class="text-xs bg-background px-1 py-0.5 rounded">@spartan-ng/helm</code>)</p>
                  <ul class="space-y-1 ml-4">
                    <li>• <strong>Styled visual components</strong></li>
                    <li>• Applies Tailwind CSS classes</li>
                    <li>• Provides design system tokens</li>
                    <li>• Wraps Brain components with styling</li>
                    <li>• Fully customizable appearance</li>
                  </ul>
                </div>
              </div>

              <div class="mt-4 p-4 bg-accent/50 rounded-md">
                <p class="font-semibold text-foreground mb-2">💡 Why This Architecture?</p>
                <ul class="space-y-2 ml-4">
                  <li>• <strong>Theming made easy</strong> - Swap Helm layer without touching behavior</li>
                  <li>• <strong>Accessibility guaranteed</strong> - Brain layer ensures WCAG compliance</li>
                  <li>• <strong>Style flexibility</strong> - Replace Tailwind with any CSS approach</li>
                  <li>• <strong>Separation of concerns</strong> - Logic and presentation are decoupled</li>
                </ul>
              </div>

              <p class="text-muted-foreground italic">
                Example: A Dialog component uses <code class="text-xs bg-muted px-1 py-0.5 rounded">BrnDialogImports</code> for behavior (focus trap, ESC key, backdrop click) and <code class="text-xs bg-muted px-1 py-0.5 rounded">HlmDialogImports</code> for styling (colors, spacing, animations).
              </p>

              <!-- Code Example -->
              <div class="mt-6 space-y-3">
                <p class="font-semibold text-foreground">Code Example - Dialog Component:</p>
                
                <pre class="bg-muted p-3 rounded-md overflow-x-auto text-xs"><code>import {{ '{' }} BrnDialogImports {{ '}' }} from '@spartan-ng/brain/dialog';  // 🧠 Behavior
import {{ '{' }} HlmDialogImports {{ '}' }} from '@spartan-ng/helm/dialog';  // ⚔️ Styling

@Component({{ '{' }}
  imports: [BrnDialogImports, HlmDialogImports],
  template: \`
    &lt;hlm-dialog&gt;
      &lt;!-- Brain: Handles trigger behavior --&gt;
      &lt;button brnDialogTrigger hlmBtn&gt;Open&lt;/button&gt;
      
      &lt;!-- Brain: Manages dialog state, focus trap, ESC key --&gt;
      &lt;hlm-dialog-content *brnDialogContent&gt;
        &lt;!-- Helm: Provides styled header --&gt;
        &lt;hlm-dialog-header&gt;
          &lt;h3 hlmDialogTitle&gt;Edit Profile&lt;/h3&gt;
        &lt;/hlm-dialog-header&gt;
        
        &lt;!-- Your content --&gt;
        &lt;div class="grid gap-4"&gt;...&lt;/div&gt;
        
        &lt;!-- Helm: Provides styled footer --&gt;
        &lt;hlm-dialog-footer&gt;
          &lt;button hlmBtn brnDialogClose&gt;Close&lt;/button&gt;
        &lt;/hlm-dialog-footer&gt;
      &lt;/hlm-dialog-content&gt;
    &lt;/hlm-dialog&gt;
  \`
{{ '}' }})

// Want different styling? Just modify Helm layer!
// Brain behavior stays the same - accessibility guaranteed.</code></pre>
              </div>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q4: Alpha Status -->
        <hlm-accordion-item id="alpha-status">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideShield" size="sm" class="text-primary" />
                <span>Spartan-NG is in alpha - should I use it in production?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>The "alpha" label can be misleading.</strong> Here's what it actually means and why GRG Kit uses it:
              </p>

              <div class="space-y-4">
                <div>
                  <p class="font-semibold text-foreground">What "Alpha" Means:</p>
                  <ul class="space-y-2 ml-4 mt-2">
                    <li>• <strong>API may evolve</strong> - Component interfaces might change as patterns mature</li>
                    <li>• <strong>Active development</strong> - New components and features are being added</li>
                    <li>• <strong>Community feedback</strong> - The project is refining based on real-world usage</li>
                  </ul>
                </div>

                <div>
                  <p class="font-semibold text-foreground">What "Alpha" Does NOT Mean:</p>
                  <ul class="space-y-2 ml-4 mt-2">
                    <li>• ❌ <strong>Not unstable</strong> - Components are built on proven patterns (Radix UI)</li>
                    <li>• ❌ <strong>Not buggy</strong> - Accessibility and behavior are well-tested</li>
                    <li>• ❌ <strong>Not experimental</strong> - The architecture is solid and production-ready</li>
                  </ul>
                </div>

                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">🛡️ Why GRG Kit Mitigates Risk:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>You own the code</strong> - Components are in your project, not a dependency</li>
                    <li>• <strong>No forced updates</strong> - Update components individually when you're ready</li>
                    <li>• <strong>Full control</strong> - Fix issues or customize without waiting for upstream</li>
                    <li>• <strong>Stable foundation</strong> - Built on Angular 21+, Tailwind CSS v4, and Radix patterns</li>
                  </ul>
                </div>
              </div>

              <p class="text-primary font-medium">
                ✅ Verdict: Yes, it's production-ready for teams that value flexibility and control over "battle-tested" black boxes.
              </p>

              <p class="text-muted-foreground italic">
                Many production apps use shadcn/ui in React (also technically "alpha"). The copy-paste model means you're not at the mercy of breaking changes.
              </p>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q5: Why GRG Kit -->
        <hlm-accordion-item id="grg-kit-value">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideZap" size="sm" class="text-primary" />
                <span>How does GRG Kit enhance Spartan-NG?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>GRG Kit is a layer on top of Spartan-NG</strong> that adds developer experience improvements and AI-first workflows:
              </p>

              <div class="space-y-4">
                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">📦 What GRG Kit Adds:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>CLI tooling</strong> - <code class="text-xs bg-background px-1 py-0.5 rounded">grg init</code> sets up everything automatically</li>
                    <li>• <strong>MCP integration</strong> - AI assistants can search and install resources</li>
                    <li>• <strong>Pre-built blocks</strong> - Auth, shell, settings page templates</li>
                    <li>• <strong>Theme system</strong> - Multiple color themes with one command</li>
                    <li>• <strong>Custom components</strong> - Additional components like file-upload</li>
                    <li>• <strong>Design system rules</strong> - AI follows best practices automatically</li>
                  </ul>
                </div>

                <div class="p-4 bg-accent/50 rounded-md">
                  <p class="font-semibold text-foreground mb-2">🤖 AI-First Workflow:</p>
                  <p class="mb-2">With MCP configured, you can simply ask your AI:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <em>"Add a login page"</em> → AI installs auth block</li>
                    <li>• <em>"Switch to claude theme"</em> → AI changes theme</li>
                    <li>• <em>"Add a file upload component"</em> → AI installs component</li>
                  </ul>
                  <p class="mt-2 text-muted-foreground">
                    The AI knows the design system rules and follows Spartan-NG patterns correctly.
                  </p>
                </div>
              </div>

              <p class="text-muted-foreground italic">
                Think of it as: <strong>Spartan-NG</strong> provides the components, <strong>GRG Kit</strong> provides the workflow and ecosystem.
              </p>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>
      </hlm-accordion>
    </div>
  `,
  styles: [],
})
export class FaqComponent {}
