/**
 * Resource definitions for GRG Kit
 * This file is auto-generated from templates directory
 * Run: node scripts/generate-resources.js to update
 *
 * Note: Spartan-NG examples are NOT included here.
 * They are pre-installed via grg init and documented in design-system.md
 */

const RESOURCES = {
  "themes": [
    {
      "name": "amber-minimal",
      "title": "Amber Minimal",
      "description": "Warm amber accents",
      "file": "amber-minimal.css",
      "path": "templates/ui/themes/amber-minimal.css",
      "defaultOutput": "src/themes/amber-minimal.css",
      "tags": [
        "minimal",
        "warm",
        "amber",
        "orange"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "claude",
      "title": "Claude",
      "description": "Claude-inspired warm tones",
      "file": "claude.css",
      "path": "templates/ui/themes/claude.css",
      "defaultOutput": "src/themes/claude.css",
      "tags": [
        "warm",
        "orange",
        "brown",
        "claude"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "clean-slate",
      "title": "Clean Slate",
      "description": "Minimal grayscale palette",
      "file": "clean-slate.css",
      "path": "templates/ui/themes/clean-slate.css",
      "defaultOutput": "src/themes/clean-slate.css",
      "tags": [
        "minimal",
        "grayscale",
        "neutral",
        "clean"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "grg-theme",
      "title": "Grg Theme",
      "description": "Default theme with purple/orange accents",
      "file": "grg-theme.css",
      "path": "templates/ui/themes/grg-theme.css",
      "defaultOutput": "src/themes/grg-theme.css",
      "tags": [
        "default",
        "purple",
        "orange",
        "colorful"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "mocks",
      "title": "Mocks",
      "description": "Theme for mockups and prototypes",
      "file": "mocks.css",
      "path": "templates/ui/themes/mocks.css",
      "defaultOutput": "src/themes/mocks.css",
      "tags": [
        "mockup",
        "prototype",
        "design"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "modern-minimal",
      "title": "Modern Minimal",
      "description": "Contemporary minimal design",
      "file": "modern-minimal.css",
      "path": "templates/ui/themes/modern-minimal.css",
      "defaultOutput": "src/themes/modern-minimal.css",
      "tags": [
        "minimal",
        "modern",
        "contemporary",
        "clean"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    }
  ],
  "components": [
    {
      "name": "file-upload",
      "title": "File Upload Component",
      "description": "file-upload component",
      "path": "templates/ui/components/file-upload",
      "defaultOutput": "src/app/components/file-upload",
      "tags": [],
      "dependencies": []
    },
    {
      "name": "stepper",
      "title": "Stepper Component",
      "description": "Multi-step form component with progress indicator",
      "path": "templates/ui/components/stepper",
      "defaultOutput": "src/app/components/stepper",
      "tags": [
        "form",
        "wizard",
        "multi-step",
        "progress"
      ],
      "dependencies": [
        "@spartan-ng/helm/button",
        "@spartan-ng/helm/card"
      ],
      "type": "grg-component",
      "prefix": "grg"
    }
  ],
  "blocks": [
    {
      "name": "auth",
      "title": "Auth Block",
      "description": "Authentication pages layout (login, signup, forgot password)",
      "path": "templates/ui/blocks/auth",
      "defaultOutput": "src/app/blocks/auth",
      "tags": [
        "auth",
        "login",
        "signup",
        "authentication"
      ],
      "dependencies": [
        "@spartan-ng/helm/button",
        "@spartan-ng/helm/card",
        "@spartan-ng/helm/form-field"
      ]
    },
    {
      "name": "settings",
      "title": "Settings Block",
      "description": "settings block",
      "path": "templates/ui/blocks/settings",
      "defaultOutput": "src/app/blocks/settings",
      "tags": [
        "settings"
      ],
      "dependencies": []
    },
    {
      "name": "shell",
      "title": "Shell Block",
      "description": "shell block",
      "path": "templates/ui/blocks/shell",
      "defaultOutput": "src/app/blocks/shell",
      "tags": [
        "shell"
      ],
      "dependencies": []
    }
  ]
};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
