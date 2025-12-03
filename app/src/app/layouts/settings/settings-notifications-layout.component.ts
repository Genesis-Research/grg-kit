import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

@Component({
  selector: 'app-settings-notifications-layout',
  standalone: true,
  imports: [FormsModule, NgIcon, HlmIcon, HlmButtonImports, HlmCardImports, HlmLabelImports, HlmSwitchImports, HlmSeparatorImports],
  viewProviders: [provideIcons({ lucideBell })],
  template: `
    <div class="h-full overflow-auto bg-muted/30 p-6">
      <div class="max-w-2xl mx-auto">
        <section hlmCard>
          <div hlmCardHeader>
            <div class="flex items-center gap-3">
              <ng-icon hlm name="lucideBell" size="sm" class="text-muted-foreground" />
              <div>
                <h3 hlmCardTitle>Notifications</h3>
                <p hlmCardDescription>Choose what notifications you receive</p>
              </div>
            </div>
          </div>
          <div hlmCardContent class="space-y-6">
            @for (group of notificationGroups; track group.title) {
              <div class="space-y-4">
                <h4 class="text-sm font-medium">{{ group.title }}</h4>
                @for (item of group.items; track item.label) {
                  <div class="flex items-center justify-between">
                    <div class="space-y-0.5">
                      <label hlmLabel class="text-sm font-normal">{{ item.label }}</label>
                      <p class="text-xs text-muted-foreground">{{ item.description }}</p>
                    </div>
                    <hlm-switch [(checked)]="item.enabled" />
                  </div>
                }
                @if (!$last) { <hlm-separator /> }
              </div>
            }
          </div>
          <div hlmCardFooter class="justify-end">
            <button hlmBtn>Save preferences</button>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SettingsNotificationsLayoutComponent {
  notificationGroups = [
    {
      title: 'Email Notifications',
      items: [
        { label: 'Marketing emails', description: 'Receive emails about new features and updates', enabled: true },
        { label: 'Security alerts', description: 'Get notified about security events', enabled: true },
        { label: 'Weekly digest', description: 'Weekly summary of your activity', enabled: false },
      ],
    },
    {
      title: 'Push Notifications',
      items: [
        { label: 'Direct messages', description: 'Notifications for new messages', enabled: true },
        { label: 'Mentions', description: 'When someone mentions you', enabled: true },
        { label: 'Comments', description: 'Replies to your posts', enabled: false },
      ],
    },
  ];
}
