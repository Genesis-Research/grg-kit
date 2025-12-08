# Block Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: `app/src/app/blocks/`  
> Run `pnpm generate:blocks` to regenerate.

## Available Blocks

### Authentication
| File | Description |
|------|-------------|
| `auth/login.component.ts` | Login form with email/password and Microsoft 365 SSO |
| `auth/register.component.ts` | Registration form with password strength indicator |
| `auth/forgot-password.component.ts` | Password reset request form |

### App Shell
| File | Description |
|------|--------------|
| `shell/sidebar-shell.component.ts` | Classic sidebar navigation layout |
| `shell/topnav-shell.component.ts` | Top navigation bar layout |
| `shell/collapsible-shell.component.ts` | Collapsible sidebar layout |
| `shell/sidebar-shell-footer.component.ts` | Sidebar layout with footer |
| `shell/topnav-shell-footer.component.ts` | Top navigation layout with footer |
| `shell/collapsible-shell-footer.component.ts` | Collapsible sidebar layout with footer |

### Settings
| File | Description |
|------|-------------|
| `settings/profile-settings.component.ts` | User profile settings form |
| `settings/notification-settings.component.ts` | Notification preferences |
| `settings/security-settings.component.ts` | Security and password settings |
| `settings/danger-zone.component.ts` | Destructive actions (delete account) |

## Usage

1. Copy the desired component file to your project
2. Update the selector and class name as needed
3. Import and use in your application

```typescript
import { LoginComponent } from './login.component';

@Component({
  imports: [LoginComponent],
  template: `<app-login (login)="onLogin($event)" />`
})
export class AuthPage {}
```

## Dependencies

- `@spartan-ng/helm` - UI components
- `@ng-icons/lucide` - Icons
- `@angular/forms` - Reactive forms (for auth components)
