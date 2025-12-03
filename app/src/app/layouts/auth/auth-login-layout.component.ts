import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail, lucideLock, lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
  selector: 'app-auth-login-layout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmInputImports,
    HlmLabelImports,
    HlmCardImports,
    HlmCheckboxImports,
    HlmInputGroupImports,
  ],
  viewProviders: [provideIcons({ lucideMail, lucideLock, lucideEye, lucideEyeOff })],
  template: `
    <div class="flex h-full items-center justify-center bg-gradient-to-br from-background to-muted/50">
      <section hlmCard class="w-full max-w-md shadow-lg">
        <div hlmCardHeader class="text-center">
          <h2 hlmCardTitle class="text-2xl">Welcome back</h2>
          <p hlmCardDescription>Enter your credentials to access your account</p>
        </div>
        <form [formGroup]="loginForm" hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <label hlmLabel for="login-email">Email</label>
            <div hlmInputGroup>
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideMail" size="sm" />
              </div>
              <input
                hlmInputGroupInput
                id="login-email"
                type="email"
                formControlName="email"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label hlmLabel for="login-password">Password</label>
              <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <div hlmInputGroup>
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideLock" size="sm" />
              </div>
              <input
                hlmInputGroupInput
                id="login-password"
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="password"
                placeholder="Enter your password"
              />
              <div hlmInputGroupAddon align="inline-end">
                <button
                  type="button"
                  hlmInputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  (click)="showPassword.set(!showPassword())"
                >
                  <ng-icon hlm [name]="showPassword() ? 'lucideEyeOff' : 'lucideEye'" size="sm" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <hlm-checkbox id="remember-me" />
            <label hlmLabel for="remember-me" class="cursor-pointer text-sm font-normal">
              Remember me for 30 days
            </label>
          </div>
          <button hlmBtn class="w-full" type="button">Sign in</button>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <button hlmBtn variant="outline" class="w-full" type="button">
            <svg class="mr-2 h-4 w-4" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            Continue with Microsoft 365
          </button>
        </form>
        <div hlmCardFooter class="justify-center">
          <p class="text-sm text-muted-foreground">
            Don't have an account?
            <a href="#" class="text-primary hover:underline">Sign up</a>
          </p>
        </div>
      </section>
    </div>
  `,
})
export class AuthLoginLayoutComponent {
  showPassword = signal(false);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
}
