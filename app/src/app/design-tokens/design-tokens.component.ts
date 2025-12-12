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
    </div>
  `,
  styles: [],
})
export class DesignTokensComponent {}
