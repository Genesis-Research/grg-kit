import { Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports],
  viewProviders: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="relative h-full">
      <button
        hlmBtn
        variant="ghost"
        size="icon"
        class="absolute right-4 top-4 z-10 text-zinc-400 hover:text-zinc-100"
        (click)="copyCode()"
      >
        <ng-icon hlm [name]="copied() ? 'lucideCheck' : 'lucideCopy'" size="sm" />
      </button>
      <div class="h-full w-full overflow-auto rounded-md border bg-zinc-950">
        <pre class="p-4 text-sm"><code class="text-zinc-100 font-mono whitespace-pre">{{ code() }}</code></pre>
      </div>
    </div>
  `,
})
export class CodeBlockComponent {
  code = input.required<string>();
  copied = signal(false);

  copyCode() {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
