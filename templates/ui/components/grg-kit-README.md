# GRG-Kit Component Templates

> **AUTO-GENERATED** - Do not edit directly.  
> Source of truth: `app/libs/grg-ui/`  
> Run `npm generate:grgComponents` to regenerate.

## Available Components

| Component | Description |
|-----------|-------------|
| `file-upload` | 12 parts merged into single file |
| `stepper` | 7 parts merged into single file |


## Usage

Each component is a single-file template that can be copied to your project:

```typescript
import { GrgFileUploadImports } from '@grg-kit/ui/file-upload';

@Component({
  imports: [GrgFileUploadImports],
  template: `
    <grg-file-upload [(files)]="files">
      <grg-file-upload-trigger>
        Drop files here
      </grg-file-upload-trigger>
    </grg-file-upload>
  `
})
export class MyComponent {}
```

## Dependencies

- `@spartan-ng/helm` - UI utilities
- `class-variance-authority` - Styling variants
- `clsx` - Class utilities
