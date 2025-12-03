import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [HlmCardImports],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Color Palette</h3>
        <p hlmCardDescription>Theme color tokens</p>
      </div>
      <div hlmCardContent>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 rounded bg-primary text-primary-foreground">Primary</div>
          <div class="p-4 rounded bg-secondary text-secondary-foreground">Secondary</div>
          <div class="p-4 rounded bg-accent text-accent-foreground">Accent</div>
          <div class="p-4 rounded bg-muted text-muted-foreground">Muted</div>
          <div class="p-4 rounded bg-destructive text-destructive-foreground">Destructive</div>
          <div class="p-4 rounded bg-card text-card-foreground border border-border">Card</div>
          <div class="p-4 rounded bg-popover text-popover-foreground border border-border">Popover</div>
          <div class="p-4 rounded bg-sidebar text-sidebar-foreground border border-border">Sidebar</div>
        </div>
      </div>
    </section>
  `,
})
export class ColorsComponent {}
