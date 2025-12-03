import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [HlmCardImports],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Typography</h3>
        <p hlmCardDescription>Font families and text styles</p>
      </div>
      <div hlmCardContent class="space-y-4">
        <p class="font-sans">Sans: The quick brown fox jumps over the lazy dog</p>
        <p class="font-serif">Serif: The quick brown fox jumps over the lazy dog</p>
        <p class="font-mono">Mono: The quick brown fox jumps over the lazy dog</p>
      </div>
    </section>
  `,
})
export class TypographyComponent {}
