import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideShield } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

@Component({
  selector: 'app-settings-security-block',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports, HlmInputImports, HlmLabelImports, HlmCardImports, HlmBadgeImports, HlmSwitchImports, HlmSeparatorImports],
  viewProviders: [provideIcons({ lucideShield })],
  template: `
    <div class="h-full overflow-auto bg-muted/30 p-6">
      <div class="max-w-2xl mx-auto">
        <section hlmCard>
          <div hlmCardHeader>
            <div class="flex items-center gap-3">
              <ng-icon hlm name="lucideShield" size="sm" class="text-muted-foreground" />
              <div>
                <h3 hlmCardTitle>Security</h3>
                <p hlmCardDescription>Manage your account security settings</p>
              </div>
            </div>
          </div>
          <div hlmCardContent class="space-y-6">
            <div class="space-y-4">
              <h4 class="text-sm font-medium">Change Password</h4>
              <div class="space-y-4">
                <div class="space-y-2">
                  <label hlmLabel for="current-password">Current password</label>
                  <input hlmInput id="current-password" type="password" />
                </div>
                <div class="space-y-2">
                  <label hlmLabel for="new-password">New password</label>
                  <input hlmInput id="new-password" type="password" />
                </div>
                <div class="space-y-2">
                  <label hlmLabel for="confirm-password">Confirm new password</label>
                  <input hlmInput id="confirm-password" type="password" />
                </div>
              </div>
              <button hlmBtn>Update password</button>
            </div>
            <hlm-separator />
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <h4 class="text-sm font-medium">Two-factor authentication</h4>
                  <p class="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <hlm-switch />
              </div>
            </div>
            <hlm-separator />
            <div class="space-y-4">
              <h4 class="text-sm font-medium">Active Sessions</h4>
              <div class="space-y-3">
                @for (session of sessions; track session.device) {
                  <div class="flex items-center justify-between p-3 rounded-lg border">
                    <div class="space-y-0.5">
                      <p class="text-sm font-medium">{{ session.device }}</p>
                      <p class="text-xs text-muted-foreground">{{ session.location }} · {{ session.time }}</p>
                    </div>
                    @if (session.current) {
                      <span hlmBadge variant="secondary">Current</span>
                    } @else {
                      <button hlmBtn variant="ghost" size="sm">Revoke</button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SettingsSecurityBlockComponent {
  sessions = [
    { device: 'Chrome on MacOS', location: 'San Francisco, CA', time: 'Active now', current: true },
    { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
    { device: 'Firefox on Windows', location: 'New York, NY', time: '3 days ago', current: false },
  ];
}
