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
  lucideCode,
  lucideBot,
  lucideTriangleAlert
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
    lucideCode,
    lucideBot,
    lucideTriangleAlert
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
        <!-- Q1: The Problem We're Solving -->
        <hlm-accordion-item id="problem-solving">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideTriangleAlert" size="sm" class="text-primary" />
                <span>What problem does GRG Kit solve?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>Traditional UI frameworks like Bootstrap create more problems than they solve</strong> when it comes to building consistent, maintainable applications:
              </p>

              <div class="space-y-4">
                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">The Bootstrap Problem:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>Too many styling options</strong> - Bootstrap offers countless ways to style the same element (btn-primary, btn-success, btn-info, btn-warning, btn-danger, btn-light, btn-dark...)</li>
                    <li>• <strong>Decision fatigue</strong> - Developers are left to choose which style "works best" with no clear guidance</li>
                    <li>• <strong>Inconsistent applications</strong> - Different developers make different choices, leading to visual chaos</li>
                    <li>• <strong>Color confusion</strong> - When should you use "info" vs "primary"? "warning" vs "secondary"? There's no system.</li>
                  </ul>
                </div>

                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">Design System vs Component Library:</p>
                  <p class="mb-2">A <strong>component library</strong> (Bootstrap, Material) gives you building blocks. A <strong>design system</strong> gives you building blocks <em>plus rules for how to use them</em>.</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>Component Library</strong> - "Here are 10 button colors, pick one"</li>
                    <li>• <strong>Design System</strong> - "Use <code class="text-xs bg-background px-1 py-0.5 rounded">primary</code> for main actions, <code class="text-xs bg-background px-1 py-0.5 rounded">destructive</code> for dangerous operations"</li>
                  </ul>
                  <p class="mt-2 text-muted-foreground">GRG Kit provides semantic color tokens with clear purposes, not arbitrary color names.</p>
                </div>
              </div>

              <div class="p-4 bg-accent/50 rounded-md">
                <p class="font-semibold text-foreground mb-2">🤖 The AI Code Generation Problem:</p>
                <p class="mb-2">With AI assistants writing more code, consistency becomes even more critical:</p>
                <ul class="space-y-2 ml-4">
                  <li>• <strong>Unreliable output</strong> - Without clear rules, AI generates inconsistent styles across requests</li>
                  <li>• <strong>Weird edge cases</strong> - AI might use <code class="text-xs bg-background px-1 py-0.5 rounded">btn-info</code> in one place and <code class="text-xs bg-background px-1 py-0.5 rounded">btn-primary</code> in another for the same purpose</li>
                  <li>• <strong>Manual cleanup</strong> - Developers spend time fixing AI-generated styling inconsistencies</li>
                </ul>
                <p class="mt-3 text-primary font-medium">GRG Kit solves this by giving AI clear design system rules to follow, producing reliable, consistent code every time.</p>
              </div>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q2: Why Spartan-NG is Perfect for AI -->
        <hlm-accordion-item id="spartan-for-ai">
          <h3 class="contents">
            <button hlmAccordionTrigger>
              <div class="flex items-center gap-2 flex-1">
                <ng-icon hlm name="lucideBot" size="sm" class="text-primary" />
                <span>Why is Spartan-NG the best fit for AI code generation?</span>
              </div>
              <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
            </button>
          </h3>
          <hlm-accordion-content>
            <div class="space-y-4 text-sm">
              <p>
                <strong>Spartan-NG's architecture is uniquely suited for AI-assisted development.</strong> Here's why:
              </p>

              <div class="space-y-4">
                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">📍 Code is Co-located:</p>
                  <p class="mb-2">Unlike traditional libraries where code lives in <code class="text-xs bg-background px-1 py-0.5 rounded">node_modules</code>, Spartan-NG components live in your project:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>AI can see the code</strong> - Components are in <code class="text-xs bg-background px-1 py-0.5 rounded">libs/ui/</code>, fully visible to AI assistants</li>
                    <li>• <strong>AI can edit the code</strong> - No need to fight against library abstractions</li>
                    <li>• <strong>Context is available</strong> - AI understands your exact component implementations</li>
                  </ul>
                </div>

                <div class="p-4 bg-muted rounded-md">
                  <p class="font-semibold text-foreground mb-2">✏️ Easy to Edit:</p>
                  <p class="mb-2">Spartan-NG uses simple, readable patterns that AI can reliably modify:</p>
                  <ul class="space-y-2 ml-4">
                    <li>• <strong>Tailwind classes</strong> - AI excels at utility-first CSS modifications</li>
                    <li>• <strong>Single-file components</strong> - Everything in one place, no hunting across files</li>
                    <li>• <strong>Predictable structure</strong> - Consistent patterns across all components</li>
                  </ul>
                </div>

                <div class="p-4 bg-accent/50 rounded-md">
                  <p class="font-semibold text-foreground mb-2">🎯 Contrast with Traditional Libraries:</p>
                  <div class="space-y-3">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span hlmBadge variant="secondary">Material/PrimeNG</span>
                      </div>
                      <ul class="space-y-1 ml-4 text-muted-foreground">
                        <li>• Code hidden in node_modules - AI can't see it</li>
                        <li>• Complex theming systems - AI struggles with SCSS variables</li>
                        <li>• Customization requires overrides - <code class="text-xs bg-background px-1 py-0.5 rounded">::ng-deep</code> and <code class="text-xs bg-background px-1 py-0.5 rounded">!important</code> hacks</li>
                      </ul>
                    </div>
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span hlmBadge variant="default">Spartan-NG</span>
                      </div>
                      <ul class="space-y-1 ml-4">
                        <li>• Code in your project - AI has full visibility</li>
                        <li>• Tailwind utilities - AI writes these fluently</li>
                        <li>• Direct editing - Change the source, not overrides</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-muted-foreground italic">
                The result: AI can generate, modify, and maintain your UI code reliably without producing the weird inconsistencies common with other frameworks.
              </p>
            </div>
          </hlm-accordion-content>
        </hlm-accordion-item>

        <!-- Q3: Why Spartan-NG -->
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
