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
      "name": "bio-lab",
      "title": "Bio Lab",
      "description": "Fresh green theme for life sciences",
      "file": "bio-lab.css",
      "path": "templates/ui/themes/bio-lab.css",
      "defaultOutput": "src/themes/bio-lab.css",
      "tags": [
        "medical",
        "green",
        "life-sciences",
        "biotech"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "chroma-clinic",
      "title": "Chroma Clinic",
      "description": "Professional blue theme with Open Sans",
      "file": "chroma-clinic.css",
      "path": "templates/ui/themes/chroma-clinic.css",
      "defaultOutput": "src/themes/chroma-clinic.css",
      "tags": [
        "medical",
        "professional",
        "blue",
        "healthcare"
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
      "description": "Default theme with blue accents",
      "file": "grg-theme.css",
      "path": "templates/ui/themes/grg-theme.css",
      "defaultOutput": "src/themes/grg-theme.css",
      "tags": [
        "default",
        "blue",
        "minimal",
        "professional"
      ],
      "features": [
        "dark-mode",
        "tailwind-v4",
        "spartan-ng",
        "oklch"
      ]
    },
    {
      "name": "helix-purple",
      "title": "Helix Purple",
      "description": "DNA-inspired purple for genomics",
      "file": "helix-purple.css",
      "path": "templates/ui/themes/helix-purple.css",
      "defaultOutput": "src/themes/helix-purple.css",
      "tags": [
        "medical",
        "purple",
        "genomics",
        "biotech"
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
    },
    {
      "name": "pharma-teal",
      "title": "Pharma Teal",
      "description": "Calming teal for pharmaceutical applications",
      "file": "pharma-teal.css",
      "path": "templates/ui/themes/pharma-teal.css",
      "defaultOutput": "src/themes/pharma-teal.css",
      "tags": [
        "medical",
        "teal",
        "pharmaceutical",
        "healthcare"
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
      "description": "Drag and drop file upload component",
      "path": "templates/ui/components/file-upload",
      "defaultOutput": "src/app/components/file-upload",
      "tags": [
        "file",
        "upload",
        "form",
        "drag-drop"
      ],
      "dependencies": [
        "@spartan-ng/helm/button"
      ]
    }
  ],
  "blocks": [
    {
      "name": "auth",
      "title": "Auth",
      "description": "Authentication pages (login, signup, forgot password)",
      "path": "templates/ui/blocks/auth",
      "defaultOutput": "src/app/blocks/auth",
      "tags": [
        "auth",
        "login",
        "signup",
        "authentication",
        "form"
      ],
      "dependencies": [
        "@spartan-ng/helm/button",
        "@spartan-ng/helm/card",
        "@spartan-ng/helm/form-field"
      ]
    },
    {
      "name": "settings",
      "title": "Settings",
      "description": "Settings pages: profile, notifications, security, danger zone",
      "path": "templates/ui/blocks/settings",
      "defaultOutput": "src/app/blocks/settings",
      "tags": [
        "settings",
        "preferences",
        "account",
        "profile",
        "security"
      ],
      "dependencies": [
        "@spartan-ng/helm/button",
        "@spartan-ng/helm/card",
        "@spartan-ng/helm/form-field",
        "@spartan-ng/helm/switch"
      ]
    },
    {
      "name": "shell",
      "title": "Shell",
      "description": "Application shell layouts: sidebar, topnav, collapsible - each with optional footer variant",
      "path": "templates/ui/blocks/shell",
      "defaultOutput": "src/app/blocks/shell",
      "tags": [
        "shell",
        "layout",
        "sidebar",
        "header",
        "footer",
        "navigation",
        "topnav",
        "collapsible"
      ],
      "dependencies": [
        "@spartan-ng/helm/button",
        "@spartan-ng/helm/icon",
        "@spartan-ng/helm/dropdown-menu"
      ]
    }
  ]
};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
