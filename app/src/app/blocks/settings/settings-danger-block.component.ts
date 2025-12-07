import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-settings-danger-block',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports, HlmCardImports],
  viewProviders: [provideIcons({ lucideTrash2 })],
  template: `
    <div class="h-full overflow-auto bg-muted/30 p-6">
      <div class="max-w-2xl mx-auto">
        <section hlmCard class="border-destructive/50">
          <div hlmCardHeader>
            <div class="flex items-center gap-3">
              <ng-icon hlm name="lucideTrash2" size="sm" class="text-destructive" />
              <div>
                <h3 hlmCardTitle class="text-destructive">Danger Zone</h3>
                <p hlmCardDescription>Irreversible and destructive actions</p>
              </div>
            </div>
          </div>
          <div hlmCardContent class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <div class="space-y-0.5">
                <p class="text-sm font-medium">Delete Account</p>
                <p class="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <button hlmBtn variant="destructive" size="sm">Delete Account</button>
            </div>
            <div class="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <div class="space-y-0.5">
                <p class="text-sm font-medium">Export Data</p>
                <p class="text-xs text-muted-foreground">Download all your data before deletion</p>
              </div>
              <button hlmBtn variant="outline" size="sm">Export</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SettingsDangerBlockComponent {}
