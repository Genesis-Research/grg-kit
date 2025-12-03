import { Component, signal, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronRight,
  lucideLock,
  lucideLayoutDashboard,
  lucideSettings,
  lucideCode,
  lucideEye,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AuthLoginLayoutComponent } from './auth/auth-login-layout.component';
import { layoutSourceMap } from './generated-sources';
import { AuthRegisterLayoutComponent } from './auth/auth-register-layout.component';
import { AuthForgotPasswordLayoutComponent } from './auth/auth-forgot-password-layout.component';
import { ShellSidebarLayoutComponent } from './shell/shell-sidebar-layout.component';
import { ShellTopnavLayoutComponent } from './shell/shell-topnav-layout.component';
import { ShellCollapsibleLayoutComponent } from './shell/shell-collapsible-layout.component';
import { SettingsProfileLayoutComponent } from './settings/settings-profile-layout.component';
import { SettingsNotificationsLayoutComponent } from './settings/settings-notifications-layout.component';
import { SettingsSecurityLayoutComponent } from './settings/settings-security-layout.component';
import { SettingsDangerLayoutComponent } from './settings/settings-danger-layout.component';
import { CodeBlockComponent } from './shared/code-block.component';

interface LayoutItem {
  id: string;
  title: string;
  file: string;
}

interface LayoutCategory {
  id: string;
  title: string;
  icon: string;
  expanded: boolean;
  items: LayoutItem[];
}

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmBadgeImports,
    HlmSidebarImports,
    AuthLoginLayoutComponent,
    AuthRegisterLayoutComponent,
    AuthForgotPasswordLayoutComponent,
    ShellSidebarLayoutComponent,
    ShellTopnavLayoutComponent,
    ShellCollapsibleLayoutComponent,
    SettingsProfileLayoutComponent,
    SettingsNotificationsLayoutComponent,
    SettingsSecurityLayoutComponent,
    SettingsDangerLayoutComponent,
    CodeBlockComponent,
  ],
  viewProviders: [
    provideIcons({
      lucideChevronDown,
      lucideChevronRight,
      lucideLock,
      lucideLayoutDashboard,
      lucideSettings,
      lucideCode,
      lucideEye,
    }),
  ],
  template: `
    <div hlmSidebarWrapper class="min-h-[calc(100vh-8rem)]">
      <!-- Sidebar -->
      <hlm-sidebar collapsible="none" class="border-r">
        <div hlmSidebarHeader class="p-4">
          <h2 class="text-lg font-semibold">Layouts</h2>
          <p class="text-sm text-muted-foreground">Full-page templates</p>
        </div>
        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (category of categories; track category.id) {
                  <li hlmSidebarMenuItem>
                    <!-- Category Header -->
                    <button
                      hlmSidebarMenuButton
                      class="justify-between"
                      (click)="toggleCategory(category.id)"
                    >
                      <span class="flex items-center gap-2">
                        <ng-icon hlm [name]="category.icon" size="sm" />
                        {{ category.title }}
                      </span>
                      <ng-icon
                        hlm
                        [name]="category.expanded ? 'lucideChevronDown' : 'lucideChevronRight'"
                        size="sm"
                        class="text-muted-foreground"
                      />
                    </button>
                    <!-- Category Items -->
                    @if (category.expanded) {
                      <ul class="ml-4 mt-1 space-y-1 border-l pl-4">
                        @for (item of category.items; track item.id) {
                          <li>
                            <button
                              class="w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors"
                              [class]="activeLayout() === item.id
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
                              (click)="selectLayout(item.id)"
                            >
                              {{ item.title }}
                            </button>
                          </li>
                        }
                      </ul>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </hlm-sidebar>

      <!-- Main Content - Full Page View -->
      <main hlmSidebarInset class="flex flex-col h-[calc(100vh-8rem)]">
        <!-- Header Bar -->
        <div class="flex items-center justify-between px-6 py-3 border-b bg-muted/30">
          <div>
            <h2 class="text-lg font-semibold">{{ currentLayoutTitle() }}</h2>
            <p class="text-sm text-muted-foreground">{{ currentLayoutFile() }}</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg border p-1">
              <button
                hlmBtn
                [variant]="showCode() ? 'ghost' : 'secondary'"
                size="sm"
                (click)="showCode.set(false)"
              >
                <ng-icon hlm name="lucideEye" size="sm" class="mr-1" />
                Preview
              </button>
              <button
                hlmBtn
                [variant]="showCode() ? 'secondary' : 'ghost'"
                size="sm"
                (click)="showCode.set(true)"
              >
                <ng-icon hlm name="lucideCode" size="sm" class="mr-1" />
                Code
              </button>
            </div>
          </div>
        </div>

        <!-- Full Page Layout Preview or Code -->
        <div class="flex-1 overflow-hidden" [class]="showCode() ? '' : 'bg-muted/20'">
          @if (showCode()) {
            <app-code-block [code]="currentSourceCode()" class="block h-full" />
          } @else {
          @switch (activeLayout()) {
            @case ('auth-login') {
              <app-auth-login-layout class="block h-full" />
            }
            @case ('auth-register') {
              <app-auth-register-layout class="block h-full" />
            }
            @case ('auth-forgot-password') {
              <app-auth-forgot-password-layout class="block h-full" />
            }
            @case ('shell-sidebar') {
              <app-shell-sidebar-layout class="block h-full" />
            }
            @case ('shell-topnav') {
              <app-shell-topnav-layout class="block h-full" />
            }
            @case ('shell-collapsible') {
              <app-shell-collapsible-layout class="block h-full" />
            }
            @case ('settings-profile') {
              <app-settings-profile-layout class="block h-full" />
            }
            @case ('settings-notifications') {
              <app-settings-notifications-layout class="block h-full" />
            }
            @case ('settings-security') {
              <app-settings-security-layout class="block h-full" />
            }
            @case ('settings-danger') {
              <app-settings-danger-layout class="block h-full" />
            }
          }
          }
        </div>
      </main>
    </div>
  `,
})
export class LayoutsComponent {
  activeLayout = signal('auth-login');
  showCode = signal(false);

  // Source code map from generated file
  sourceCodeMap = layoutSourceMap;

  categories: LayoutCategory[] = [
    {
      id: 'auth',
      title: 'Authentication',
      icon: 'lucideLock',
      expanded: true,
      items: [
        { id: 'auth-login', title: 'Login', file: 'login.component.ts' },
        { id: 'auth-register', title: 'Sign Up', file: 'register.component.ts' },
        { id: 'auth-forgot-password', title: 'Forgot Password', file: 'forgot-password.component.ts' },
      ],
    },
    {
      id: 'app-shell',
      title: 'App Shell',
      icon: 'lucideLayoutDashboard',
      expanded: false,
      items: [
        { id: 'shell-sidebar', title: 'Sidebar Shell', file: 'sidebar-shell.component.ts' },
        { id: 'shell-topnav', title: 'Top Navigation', file: 'topnav-shell.component.ts' },
        { id: 'shell-collapsible', title: 'Collapsible Sidebar', file: 'collapsible-shell.component.ts' },
      ],
    },
    {
      id: 'admin-settings',
      title: 'Admin & Settings',
      icon: 'lucideSettings',
      expanded: false,
      items: [
        { id: 'settings-profile', title: 'Profile Settings', file: 'profile-settings.component.ts' },
        { id: 'settings-notifications', title: 'Notifications', file: 'notification-settings.component.ts' },
        { id: 'settings-security', title: 'Security', file: 'security-settings.component.ts' },
        { id: 'settings-danger', title: 'Danger Zone', file: 'danger-zone.component.ts' },
      ],
    },
  ];

  currentLayoutTitle = computed(() => {
    for (const category of this.categories) {
      const item = category.items.find(i => i.id === this.activeLayout());
      if (item) return item.title;
    }
    return '';
  });

  currentLayoutFile = computed(() => {
    for (const category of this.categories) {
      const item = category.items.find(i => i.id === this.activeLayout());
      if (item) return item.file;
    }
    return '';
  });

  currentSourceCode = computed(() => {
    return this.sourceCodeMap[this.activeLayout()] || '// Source code not available';
  });

  toggleCategory(categoryId: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.expanded = !category.expanded;
    }
  }

  selectLayout(layoutId: string) {
    this.activeLayout.set(layoutId);
  }
}
