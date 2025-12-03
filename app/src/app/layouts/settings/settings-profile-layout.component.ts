import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

@Component({
  selector: 'app-settings-profile-layout',
  standalone: true,
  imports: [NgIcon, HlmIcon, HlmButtonImports, HlmInputImports, HlmLabelImports, HlmCardImports, HlmSeparatorImports],
  viewProviders: [provideIcons({ lucideUser })],
  template: `
    <div class="h-full overflow-auto bg-muted/30 p-6">
      <div class="max-w-2xl mx-auto">
        <section hlmCard>
          <div hlmCardHeader>
            <div class="flex items-center gap-3">
              <ng-icon hlm name="lucideUser" size="sm" class="text-muted-foreground" />
              <div>
                <h3 hlmCardTitle>Profile</h3>
                <p hlmCardDescription>Manage your public profile information</p>
              </div>
            </div>
          </div>
          <div hlmCardContent class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ng-icon hlm name="lucideUser" size="lg" />
              </div>
              <div class="space-y-2">
                <button hlmBtn variant="outline" size="sm">Change avatar</button>
                <p class="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
              </div>
            </div>
            <hlm-separator />
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <label hlmLabel for="firstname">First name</label>
                <input hlmInput id="firstname" value="John" />
              </div>
              <div class="space-y-2">
                <label hlmLabel for="lastname">Last name</label>
                <input hlmInput id="lastname" value="Doe" />
              </div>
            </div>
            <div class="space-y-2">
              <label hlmLabel for="email">Email</label>
              <input hlmInput id="email" type="email" value="john.doe@example.com" />
            </div>
            <div class="space-y-2">
              <label hlmLabel for="bio">Bio</label>
              <textarea hlmInput id="bio" rows="3" placeholder="Tell us about yourself..."></textarea>
            </div>
          </div>
          <div hlmCardFooter class="justify-end gap-2">
            <button hlmBtn variant="outline">Cancel</button>
            <button hlmBtn>Save changes</button>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class SettingsProfileLayoutComponent {}
