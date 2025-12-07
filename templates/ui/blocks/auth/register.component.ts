/**
 * Auth Register Component
 * 
 * A standalone Angular component ready to use in your project.
 * Copy this file to your project and customize as needed.
 * 
 * Dependencies:
 * - @spartan-ng/helm (UI components)
 * - @ng-icons/lucide (icons)
 * - @angular/forms (if using forms)
 */
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail, lucideLock, lucideEye, lucideEyeOff, lucideUser, lucideCheck, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
  selector: 'app-register',
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
  viewProviders: [provideIcons({ lucideMail, lucideLock, lucideEye, lucideEyeOff, lucideUser, lucideCheck, lucideX })],
  template: `
    <div class="flex h-full items-center justify-center bg-gradient-to-br from-background to-muted/50 overflow-auto py-8">
      <section hlmCard class="w-full max-w-md shadow-lg">
        <div hlmCardHeader class="text-center">
          <h2 hlmCardTitle class="text-2xl">Create an account</h2>
          <p hlmCardDescription>Enter your details to get started</p>
        </div>
        <form [formGroup]="registerForm" hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <label hlmLabel for="register-name">Full Name</label>
            <div hlmInputGroup>
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideUser" size="sm" />
              </div>
              <input hlmInputGroupInput id="register-name" type="text" formControlName="name" placeholder="John Doe" />
            </div>
          </div>
          <div class="space-y-2">
            <label hlmLabel for="register-email">Email</label>
            <div hlmInputGroup>
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideMail" size="sm" />
              </div>
              <input hlmInputGroupInput id="register-email" type="email" formControlName="email" placeholder="name@example.com" />
            </div>
          </div>
          <div class="space-y-2">
            <label hlmLabel for="register-password">Password</label>
            <div hlmInputGroup>
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideLock" size="sm" />
              </div>
              <input
                hlmInputGroupInput
                id="register-password"
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="password"
                placeholder="Create a password"
              />
              <div hlmInputGroupAddon align="inline-end">
                <button type="button" hlmInputGroupButton variant="ghost" size="icon-sm" (click)="showPassword.set(!showPassword())">
                  <ng-icon hlm [name]="showPassword() ? 'lucideEyeOff' : 'lucideEye'" size="sm" />
                </button>
              </div>
            </div>
            @if (registerForm.get('password')?.value) {
              <div class="space-y-2">
                <div class="flex gap-1">
                  @for (i of [0, 1, 2, 3]; track i) {
                    <div class="h-1 flex-1 rounded-full transition-colors" [class]="i < passwordStrength() ? strengthColors[passwordStrength() - 1] : 'bg-muted'"></div>
                  }
                </div>
                <ul class="space-y-1 text-xs">
                  <li class="flex items-center gap-1" [class.text-green-600]="hasMinLength()" [class.text-muted-foreground]="!hasMinLength()">
                    <ng-icon hlm [name]="hasMinLength() ? 'lucideCheck' : 'lucideX'" size="xs" /> At least 8 characters
                  </li>
                  <li class="flex items-center gap-1" [class.text-green-600]="hasUppercase()" [class.text-muted-foreground]="!hasUppercase()">
                    <ng-icon hlm [name]="hasUppercase() ? 'lucideCheck' : 'lucideX'" size="xs" /> One uppercase letter
                  </li>
                  <li class="flex items-center gap-1" [class.text-green-600]="hasNumber()" [class.text-muted-foreground]="!hasNumber()">
                    <ng-icon hlm [name]="hasNumber() ? 'lucideCheck' : 'lucideX'" size="xs" /> One number
                  </li>
                </ul>
              </div>
            }
          </div>
          <div class="flex items-start gap-2">
            <hlm-checkbox id="accept-terms" class="mt-0.5" />
            <label hlmLabel for="accept-terms" class="cursor-pointer text-sm font-normal leading-relaxed">
              I agree to the <a href="#" class="text-primary hover:underline">Terms</a> and <a href="#" class="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>
          <button hlmBtn class="w-full" type="button">Create account</button>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div>
            <div class="relative flex justify-center text-xs uppercase"><span class="bg-card px-2 text-muted-foreground">Or continue with</span></div>
          </div>
          <button hlmBtn variant="outline" class="w-full" type="button">
            <svg class="mr-2 h-4 w-4" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
            Continue with Microsoft 365
          </button>
        </form>
        <div hlmCardFooter class="justify-center">
          <p class="text-sm text-muted-foreground">Already have an account? <a href="#" class="text-primary hover:underline">Sign in</a></p>
        </div>
      </section>
    </div>
  `,
})
export class RegisterComponent {
  showPassword = signal(false);
  strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  get password(): string { return this.registerForm.get('password')?.value || ''; }
  hasMinLength(): boolean { return this.password.length >= 8; }
  hasUppercase(): boolean { return /[A-Z]/.test(this.password); }
  hasNumber(): boolean { return /[0-9]/.test(this.password); }
  passwordStrength(): number {
    let s = 0;
    if (this.hasMinLength()) s++;
    if (this.hasUppercase()) s++;
    if (this.hasNumber()) s++;
    if (/[!@#$%^&*]/.test(this.password)) s++;
    return s;
  }
}