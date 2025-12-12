import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePaintbrush } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-design-tokens',
  imports: [HlmCardImports, HlmTypographyImports, NgIcon, HlmIcon],
  providers: [provideIcons({ lucidePaintbrush })],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">Design Tokens</h1>
        <p class="text-lg text-muted-foreground">
          Colors and typography from your theme
        </p>
      </div>

      <!-- Color Palette -->
      <section hlmCard>
        <div hlmCardHeader>
          <div class="flex items-center gap-2">
            <ng-icon hlm name="lucidePaintbrush" size="lg" />
            <h3 hlmCardTitle>Color Palette</h3>
          </div>
          <p hlmCardDescription>Semantic colors that adapt to your theme</p>
        </div>
        <div hlmCardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="p-3 rounded text-sm bg-primary text-primary-foreground">Primary</div>
            <div class="p-3 rounded text-sm bg-secondary text-secondary-foreground">Secondary</div>
            <div class="p-3 rounded text-sm bg-accent text-accent-foreground">Accent</div>
            <div class="p-3 rounded text-sm bg-muted text-muted-foreground">Muted</div>
            <div class="p-3 rounded text-sm bg-destructive text-destructive-foreground">Destructive</div>
            <div class="p-3 rounded text-sm bg-card text-card-foreground border border-border">Card</div>
            <div class="p-3 rounded text-sm bg-popover text-popover-foreground border border-border">Popover</div>
            <div class="p-3 rounded text-sm bg-sidebar text-sidebar-foreground border border-border">Sidebar</div>
          </div>
        </div>
      </section>

      <!-- Typography Scale -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Typography Scale</h3>
          <p hlmCardDescription>Heading and text styles</p>
        </div>
        <div hlmCardContent>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h1 hlmH1 class="border-none text-2xl">Heading 1</h1>
              <h2 hlmH2 class="text-xl">Heading 2</h2>
              <h3 hlmH3 class="text-lg">Heading 3</h3>
              <h4 hlmH4 class="text-base">Heading 4</h4>
            </div>
            <div class="space-y-2">
              <p hlmLarge>Large text for emphasis</p>
              <p hlmP>Default paragraph text</p>
              <p hlmSmall>Small text for captions</p>
              <p hlmMuted>Muted text for hints</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Font Families -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Font Families</h3>
          <p hlmCardDescription>Available font stacks</p>
        </div>
        <div hlmCardContent>
          <div class="space-y-2 text-sm">
            <p class="font-sans">Sans: The quick brown fox jumps over the lazy dog</p>
            <p class="font-serif">Serif: The quick brown fox jumps over the lazy dog</p>
            <p class="font-mono">Mono: The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>
      </section>

      <!-- How Design Tokens Work -->
      <section hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>How TailwindCSS v4 Design Tokens Work</h3>
          <p hlmCardDescription>Understanding the two-layer token system</p>
        </div>
        <div hlmCardContent class="space-y-6">
          <!-- Overview -->
          <div class="space-y-2">
            <h4 class="font-semibold">The Two-Layer System</h4>
            <p class="text-sm text-muted-foreground">
              TailwindCSS v4 uses a two-layer approach: CSS variables define values, and the
              <code class="px-1 py-0.5 bg-muted rounded text-xs font-mono">&#64;theme inline</code> block registers them as utility classes.
            </p>
          </div>

          <!-- Step 1: Define Variables -->
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">Step 1: Define CSS Variables</h4>
            <pre class="p-3 bg-muted rounded text-xs font-mono overflow-x-auto"><code>:root &#123;
  --primary: oklch(0.6171 0.1375 39.0427);
  --font-sans: Inter, sans-serif;
  --radius: 0.5rem;
&#125;</code></pre>
            <p class="text-xs text-muted-foreground">
              Variables in <code class="px-1 py-0.5 bg-muted rounded font-mono">:root</code> hold the actual values. These can be overridden per theme or dark mode.
            </p>
          </div>

          <!-- Step 2: Register with Tailwind -->
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">Step 2: Register with &#64;theme inline</h4>
            <pre class="p-3 bg-muted rounded text-xs font-mono overflow-x-auto"><code>&#64;theme inline &#123;
  --color-primary: var(--primary);
  --font-sans: var(--font-sans);
  --radius-lg: var(--radius);
&#125;</code></pre>
            <p class="text-xs text-muted-foreground">
              The <code class="px-1 py-0.5 bg-muted rounded font-mono">&#64;theme inline</code> block tells Tailwind to generate utility classes from these variables.
            </p>
          </div>

          <!-- Token Type Mapping -->
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">Token Type → Utility Class Mapping</h4>
            <div class="border rounded overflow-hidden">
              <table class="w-full text-xs">
                <thead class="bg-muted">
                  <tr>
                    <th class="text-left p-2 font-medium">&#64;theme Variable</th>
                    <th class="text-left p-2 font-medium">Generated Classes</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr>
                    <td class="p-2 font-mono">--color-*</td>
                    <td class="p-2 font-mono">bg-*, text-*, border-*, ring-*</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--font-*</td>
                    <td class="p-2 font-mono">font-*</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--radius-*</td>
                    <td class="p-2 font-mono">rounded-*</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--shadow-*</td>
                    <td class="p-2 font-mono">shadow-*</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--spacing</td>
                    <td class="p-2 font-mono">p-*, m-*, gap-* (multiplied by base)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--text-*</td>
                    <td class="p-2 font-mono">text-* (font sizes)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">--tracking-*</td>
                    <td class="p-2 font-mono">tracking-* (letter spacing)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Adding Custom Tokens -->
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">Adding Custom Tokens</h4>
            <p class="text-xs text-muted-foreground">
              To add a custom font (e.g., a display font for headings):
            </p>
            <pre class="p-3 bg-muted rounded text-xs font-mono overflow-x-auto"><code>/* 1. Define in :root */
:root &#123;
  --font-display: "Cal Sans", sans-serif;
&#125;

/* 2. Register in &#64;theme inline */
&#64;theme inline &#123;
  --font-display: var(--font-display);
&#125;

/* 3. Use in templates */
&lt;h1 class="font-display"&gt;Heading&lt;/h1&gt;</code></pre>
          </div>

          <!-- Key Insight -->
          <div class="p-3 bg-accent/50 rounded border border-accent">
            <p class="text-sm font-medium">Key Insight</p>
            <p class="text-xs text-muted-foreground mt-1">
              The prefix in <code class="px-1 py-0.5 bg-muted rounded font-mono">&#64;theme inline</code> determines the utility type:
              <code class="px-1 py-0.5 bg-muted rounded font-mono">--color-*</code> → color utilities,
              <code class="px-1 py-0.5 bg-muted rounded font-mono">--font-*</code> → font utilities,
              <code class="px-1 py-0.5 bg-muted rounded font-mono">--radius-*</code> → border-radius utilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [],
})
export class DesignTokensComponent {}
