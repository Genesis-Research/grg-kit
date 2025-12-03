import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail, lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
  selector: 'app-auth-forgot-password-layout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon, HlmIcon, HlmButtonImports, HlmInputImports, HlmLabelImports, HlmCardImports, HlmInputGroupImports],
  viewProviders: [provideIcons({ lucideMail, lucideArrowLeft })],
  template: `
    <div class="flex h-full items-center justify-center bg-gradient-to-br from-background to-muted/50">
      <section hlmCard class="w-full max-w-md shadow-lg">
        <div hlmCardHeader class="text-center">
          <h2 hlmCardTitle class="text-2xl">Forgot password?</h2>
          <p hlmCardDescription>No worries, we'll send you reset instructions</p>
        </div>
        <form [formGroup]="form" hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <label hlmLabel for="forgot-email">Email</label>
            <div hlmInputGroup>
              <div hlmInputGroupAddon><ng-icon hlm name="lucideMail" size="sm" /></div>
              <input hlmInputGroupInput id="forgot-email" type="email" formControlName="email" placeholder="name@example.com" />
            </div>
          </div>
          <button hlmBtn class="w-full" type="button">Reset password</button>
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
          <a href="#" class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ng-icon hlm name="lucideArrowLeft" size="sm" /> Back to login
          </a>
        </div>
      </section>
    </div>
  `,
})
export class AuthForgotPasswordLayoutComponent {
  form = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]) });
}
