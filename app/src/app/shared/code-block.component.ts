import { Component, computed, effect, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { codeToHtml } from 'shiki';

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
      <div class="code-block h-full w-full overflow-auto rounded-md border bg-zinc-950">
        @if (highlightedCode()) {
          <div class="p-4 text-sm" [innerHTML]="highlightedCode()"></div>
        } @else {
          <pre class="p-4 text-sm"><code class="text-zinc-100 font-mono whitespace-pre">{{ code() }}</code></pre>
        }
      </div>
    </div>
  `,
  styles: `
    :host ::ng-deep .shiki {
      background-color: transparent !important;
      margin: 0;
      padding: 0;
    }
    :host ::ng-deep .shiki code {
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `,
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>('typescript');
  copied = signal(false);
  highlightedCode = signal<SafeHtml | null>(null);

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      const code = this.code();
      const lang = this.language();
      if (code) {
        this.highlightCode(code, lang);
      }
    });
  }

  private async highlightCode(code: string, lang: string) {
    try {
      const html = await codeToHtml(code, {
        lang: lang,
        theme: 'github-dark',
      });
      this.highlightedCode.set(this.sanitizer.bypassSecurityTrustHtml(html));
    } catch {
      // Fallback to plain text if highlighting fails
      this.highlightedCode.set(null);
    }
  }

  copyCode() {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
