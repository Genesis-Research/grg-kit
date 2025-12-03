/**
 * Resource definitions for GRG Kit
 * This file is auto-generated from templates directory
 * Run: node scripts/generate-resources.js to update
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
  "layouts": [
    {
      "name": "auth",
      "title": "Auth Layout",
      "description": "Authentication pages layout (login, signup, forgot password)",
      "path": "templates/ui/layouts/auth",
      "defaultOutput": "src/app/layouts/auth",
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
      "title": "Settings Layout",
      "description": "settings layout",
      "path": "templates/ui/layouts/settings",
      "defaultOutput": "src/app/layouts/settings",
      "tags": [],
      "dependencies": []
    },
    {
      "name": "shell",
      "title": "Shell Layout",
      "description": "shell layout",
      "path": "templates/ui/layouts/shell",
      "defaultOutput": "src/app/layouts/shell",
      "tags": [],
      "dependencies": []
    }
  ],
  "examples": {
    "all": {
      "name": "all",
      "title": "All Spartan-NG Examples",
      "description": "Complete collection of 56+ Spartan-NG component examples with usage patterns and variants",
      "path": "templates/spartan-examples",
      "defaultOutput": "src/app/spartan-examples",
      "tags": [
        "examples",
        "spartan-ng",
        "all",
        "reference"
      ],
      "count": "56+",
      "purpose": "Learning and reference for developers and LLMs"
    },
    "components": [
      {
        "name": "accordion",
        "title": "Accordion Examples",
        "description": "Collapsible content sections examples",
        "path": "templates/spartan-examples/components/(accordion)",
        "defaultOutput": "src/app/examples/accordion",
        "tags": [
          "accordion",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "alert",
        "title": "Alert Examples",
        "description": "Status messages and notifications examples",
        "path": "templates/spartan-examples/components/(alert)",
        "defaultOutput": "src/app/examples/alert",
        "tags": [
          "alert",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "alert-dialog",
        "title": "Alert Dialog Examples",
        "description": "Confirmation and alert dialogs examples",
        "path": "templates/spartan-examples/components/(alert-dialog)",
        "defaultOutput": "src/app/examples/alert-dialog",
        "tags": [
          "alert-dialog",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "aspect-ratio",
        "title": "Aspect Ratio Examples",
        "description": "Responsive containers with fixed aspect ratios examples",
        "path": "templates/spartan-examples/components/(aspect-ratio)",
        "defaultOutput": "src/app/examples/aspect-ratio",
        "tags": [
          "aspect-ratio",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "autocomplete",
        "title": "Autocomplete Examples",
        "description": "Search-enabled input controls examples",
        "path": "templates/spartan-examples/components/(autocomplete)",
        "defaultOutput": "src/app/examples/autocomplete",
        "tags": [
          "autocomplete",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "avatar",
        "title": "Avatar Examples",
        "description": "User profile images with fallbacks examples",
        "path": "templates/spartan-examples/components/(avatar)",
        "defaultOutput": "src/app/examples/avatar",
        "tags": [
          "avatar",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "badge",
        "title": "Badge Examples",
        "description": "Status indicators and tags examples",
        "path": "templates/spartan-examples/components/(badge)",
        "defaultOutput": "src/app/examples/badge",
        "tags": [
          "badge",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "breadcrumb",
        "title": "Breadcrumb Examples",
        "description": "Hierarchical navigation indicators examples",
        "path": "templates/spartan-examples/components/(breadcrumb)",
        "defaultOutput": "src/app/examples/breadcrumb",
        "tags": [
          "breadcrumb",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "button",
        "title": "Button Examples",
        "description": "Interactive buttons with multiple variants examples",
        "path": "templates/spartan-examples/components/(button)",
        "defaultOutput": "src/app/examples/button",
        "tags": [
          "button",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "button-group",
        "title": "Button Group Examples",
        "description": "Grouped button controls examples",
        "path": "templates/spartan-examples/components/(button-group)",
        "defaultOutput": "src/app/examples/button-group",
        "tags": [
          "button-group",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "calendar",
        "title": "Calendar Examples",
        "description": "Date selection interfaces examples",
        "path": "templates/spartan-examples/components/(calendar)",
        "defaultOutput": "src/app/examples/calendar",
        "tags": [
          "calendar",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "card",
        "title": "Card Examples",
        "description": "Content containers with header, content, and footer examples",
        "path": "templates/spartan-examples/components/(card)",
        "defaultOutput": "src/app/examples/card",
        "tags": [
          "card",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "carousel",
        "title": "Carousel Examples",
        "description": "Image and content carousels examples",
        "path": "templates/spartan-examples/components/(carousel)",
        "defaultOutput": "src/app/examples/carousel",
        "tags": [
          "carousel",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "checkbox",
        "title": "Checkbox Examples",
        "description": "Boolean input controls examples",
        "path": "templates/spartan-examples/components/(checkbox)",
        "defaultOutput": "src/app/examples/checkbox",
        "tags": [
          "checkbox",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "collapsible",
        "title": "Collapsible Examples",
        "description": "Expandable/collapsible content examples",
        "path": "templates/spartan-examples/components/(collapsible)",
        "defaultOutput": "src/app/examples/collapsible",
        "tags": [
          "collapsible",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "combobox",
        "title": "Combobox Examples",
        "description": "Searchable select controls examples",
        "path": "templates/spartan-examples/components/(combobox)",
        "defaultOutput": "src/app/examples/combobox",
        "tags": [
          "combobox",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "command",
        "title": "Command Examples",
        "description": "Command palette and search interfaces examples",
        "path": "templates/spartan-examples/components/(command)",
        "defaultOutput": "src/app/examples/command",
        "tags": [
          "command",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "context-menu",
        "title": "Context Menu Examples",
        "description": "Right-click context menus examples",
        "path": "templates/spartan-examples/components/(context-menu)",
        "defaultOutput": "src/app/examples/context-menu",
        "tags": [
          "context-menu",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "data-table",
        "title": "Data Table Examples",
        "description": "Advanced data tables with sorting and filtering examples",
        "path": "templates/spartan-examples/components/(data-table)",
        "defaultOutput": "src/app/examples/data-table",
        "tags": [
          "data-table",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "date-picker",
        "title": "Date Picker Examples",
        "description": "Date input controls examples",
        "path": "templates/spartan-examples/components/(date-picker)",
        "defaultOutput": "src/app/examples/date-picker",
        "tags": [
          "date-picker",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "dialog",
        "title": "Dialog Examples",
        "description": "Modal dialogs and popups examples",
        "path": "templates/spartan-examples/components/(dialog)",
        "defaultOutput": "src/app/examples/dialog",
        "tags": [
          "dialog",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "dropdown-menu",
        "title": "Dropdown Menu Examples",
        "description": "Dropdown menu controls examples",
        "path": "templates/spartan-examples/components/(dropdown-menu)",
        "defaultOutput": "src/app/examples/dropdown-menu",
        "tags": [
          "dropdown-menu",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "empty",
        "title": "Empty Examples",
        "description": "Empty state components examples",
        "path": "templates/spartan-examples/components/(empty)",
        "defaultOutput": "src/app/examples/empty",
        "tags": [
          "empty",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "field",
        "title": "Field Examples",
        "description": "Form field components examples",
        "path": "templates/spartan-examples/components/(field)",
        "defaultOutput": "src/app/examples/field",
        "tags": [
          "field",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "form-field",
        "title": "Form Field Examples",
        "description": "Complete form fields with validation examples",
        "path": "templates/spartan-examples/components/(form-field)",
        "defaultOutput": "src/app/examples/form-field",
        "tags": [
          "form-field",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "hover-card",
        "title": "Hover Card Examples",
        "description": "Content previews on hover examples",
        "path": "templates/spartan-examples/components/(hover-card)",
        "defaultOutput": "src/app/examples/hover-card",
        "tags": [
          "hover-card",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "icon",
        "title": "Icon Examples",
        "description": "Icon components examples",
        "path": "templates/spartan-examples/components/(icon)",
        "defaultOutput": "src/app/examples/icon",
        "tags": [
          "icon",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "input",
        "title": "Input Examples",
        "description": "Form input fields examples",
        "path": "templates/spartan-examples/components/(input)",
        "defaultOutput": "src/app/examples/input",
        "tags": [
          "input",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "input-group",
        "title": "Input Group Examples",
        "description": "Grouped input controls examples",
        "path": "templates/spartan-examples/components/(input-group)",
        "defaultOutput": "src/app/examples/input-group",
        "tags": [
          "input-group",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "input-otp",
        "title": "Input Otp Examples",
        "description": "One-time password inputs examples",
        "path": "templates/spartan-examples/components/(input-otp)",
        "defaultOutput": "src/app/examples/input-otp",
        "tags": [
          "input-otp",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "item",
        "title": "Item Examples",
        "description": "List item components examples",
        "path": "templates/spartan-examples/components/(item)",
        "defaultOutput": "src/app/examples/item",
        "tags": [
          "item",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "kbd",
        "title": "Kbd Examples",
        "description": "Keyboard shortcut displays examples",
        "path": "templates/spartan-examples/components/(kbd)",
        "defaultOutput": "src/app/examples/kbd",
        "tags": [
          "kbd",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "label",
        "title": "Label Examples",
        "description": "Form labels examples",
        "path": "templates/spartan-examples/components/(label)",
        "defaultOutput": "src/app/examples/label",
        "tags": [
          "label",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "menubar",
        "title": "Menubar Examples",
        "description": "Application menu bars examples",
        "path": "templates/spartan-examples/components/(menubar)",
        "defaultOutput": "src/app/examples/menubar",
        "tags": [
          "menubar",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "navigation-menu",
        "title": "Navigation Menu Examples",
        "description": "Primary navigation menus examples",
        "path": "templates/spartan-examples/components/(navigation-menu)",
        "defaultOutput": "src/app/examples/navigation-menu",
        "tags": [
          "navigation-menu",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "pagination",
        "title": "Pagination Examples",
        "description": "Data pagination controls examples",
        "path": "templates/spartan-examples/components/(pagination)",
        "defaultOutput": "src/app/examples/pagination",
        "tags": [
          "pagination",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "popover",
        "title": "Popover Examples",
        "description": "Contextual content overlays examples",
        "path": "templates/spartan-examples/components/(popover)",
        "defaultOutput": "src/app/examples/popover",
        "tags": [
          "popover",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "progress",
        "title": "Progress Examples",
        "description": "Progress indicators examples",
        "path": "templates/spartan-examples/components/(progress)",
        "defaultOutput": "src/app/examples/progress",
        "tags": [
          "progress",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "radio-group",
        "title": "Radio Group Examples",
        "description": "Single-choice selection controls examples",
        "path": "templates/spartan-examples/components/(radio-group)",
        "defaultOutput": "src/app/examples/radio-group",
        "tags": [
          "radio-group",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "resizable",
        "title": "Resizable Examples",
        "description": "Resizable panels examples",
        "path": "templates/spartan-examples/components/(resizable)",
        "defaultOutput": "src/app/examples/resizable",
        "tags": [
          "resizable",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "scroll-area",
        "title": "Scroll Area Examples",
        "description": "Custom scrollable containers examples",
        "path": "templates/spartan-examples/components/(scroll-area)",
        "defaultOutput": "src/app/examples/scroll-area",
        "tags": [
          "scroll-area",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "select",
        "title": "Select Examples",
        "description": "Dropdown selection controls examples",
        "path": "templates/spartan-examples/components/(select)",
        "defaultOutput": "src/app/examples/select",
        "tags": [
          "select",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "separator",
        "title": "Separator Examples",
        "description": "Visual dividers examples",
        "path": "templates/spartan-examples/components/(separator)",
        "defaultOutput": "src/app/examples/separator",
        "tags": [
          "separator",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "sheet",
        "title": "Sheet Examples",
        "description": "Slide-out panels examples",
        "path": "templates/spartan-examples/components/(sheet)",
        "defaultOutput": "src/app/examples/sheet",
        "tags": [
          "sheet",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "sidebar",
        "title": "Sidebar Examples",
        "description": "Application sidebars examples",
        "path": "templates/spartan-examples/components/(sidebar)",
        "defaultOutput": "src/app/examples/sidebar",
        "tags": [
          "sidebar",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "skeleton",
        "title": "Skeleton Examples",
        "description": "Loading state placeholders examples",
        "path": "templates/spartan-examples/components/(skeleton)",
        "defaultOutput": "src/app/examples/skeleton",
        "tags": [
          "skeleton",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "slider",
        "title": "Slider Examples",
        "description": "Range input controls examples",
        "path": "templates/spartan-examples/components/(slider)",
        "defaultOutput": "src/app/examples/slider",
        "tags": [
          "slider",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "sonner",
        "title": "Sonner Examples",
        "description": "Toast notifications examples",
        "path": "templates/spartan-examples/components/(sonner)",
        "defaultOutput": "src/app/examples/sonner",
        "tags": [
          "sonner",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "spinner",
        "title": "Spinner Examples",
        "description": "Loading spinners examples",
        "path": "templates/spartan-examples/components/(spinner)",
        "defaultOutput": "src/app/examples/spinner",
        "tags": [
          "spinner",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "switch",
        "title": "Switch Examples",
        "description": "Toggle switches examples",
        "path": "templates/spartan-examples/components/(switch)",
        "defaultOutput": "src/app/examples/switch",
        "tags": [
          "switch",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "table",
        "title": "Table Examples",
        "description": "Data tables examples",
        "path": "templates/spartan-examples/components/(table)",
        "defaultOutput": "src/app/examples/table",
        "tags": [
          "table",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "tabs",
        "title": "Tabs Examples",
        "description": "Tabbed interfaces examples",
        "path": "templates/spartan-examples/components/(tabs)",
        "defaultOutput": "src/app/examples/tabs",
        "tags": [
          "tabs",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "textarea",
        "title": "Textarea Examples",
        "description": "Multi-line text inputs examples",
        "path": "templates/spartan-examples/components/(textarea)",
        "defaultOutput": "src/app/examples/textarea",
        "tags": [
          "textarea",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "toggle",
        "title": "Toggle Examples",
        "description": "Toggle buttons examples",
        "path": "templates/spartan-examples/components/(toggle)",
        "defaultOutput": "src/app/examples/toggle",
        "tags": [
          "toggle",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "toggle-group",
        "title": "Toggle Group Examples",
        "description": "Grouped toggle controls examples",
        "path": "templates/spartan-examples/components/(toggle-group)",
        "defaultOutput": "src/app/examples/toggle-group",
        "tags": [
          "toggle-group",
          "example",
          "spartan-ng"
        ]
      },
      {
        "name": "tooltip",
        "title": "Tooltip Examples",
        "description": "Contextual tooltips examples",
        "path": "templates/spartan-examples/components/(tooltip)",
        "defaultOutput": "src/app/examples/tooltip",
        "tags": [
          "tooltip",
          "example",
          "spartan-ng"
        ]
      }
    ]
  }
};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
