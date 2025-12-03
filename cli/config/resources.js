/**
 * Resource definitions for GRG Kit
 * This structure is designed to be easily consumed by MCP servers and LLMs
 */

const RESOURCES = {
  themes: [
    {
      name: 'grg-theme',
      title: 'GRG Theme',
      description: 'Default theme with purple/orange accents',
      file: 'grg-theme.css',
      path: 'templates/ui/themes/grg-theme.css',
      defaultOutput: 'src/themes/grg-theme.css',
      tags: ['default', 'purple', 'orange', 'colorful'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    },
    {
      name: 'claude',
      title: 'Claude Theme',
      description: 'Claude-inspired warm tones',
      file: 'claude.css',
      path: 'templates/ui/themes/claude.css',
      defaultOutput: 'src/themes/claude.css',
      tags: ['warm', 'orange', 'brown', 'claude'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    },
    {
      name: 'clean-slate',
      title: 'Clean Slate',
      description: 'Minimal grayscale palette',
      file: 'clean-slate.css',
      path: 'templates/ui/themes/clean-slate.css',
      defaultOutput: 'src/themes/clean-slate.css',
      tags: ['minimal', 'grayscale', 'neutral', 'clean'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    },
    {
      name: 'modern-minimal',
      title: 'Modern Minimal',
      description: 'Contemporary minimal design',
      file: 'modern-minimal.css',
      path: 'templates/ui/themes/modern-minimal.css',
      defaultOutput: 'src/themes/modern-minimal.css',
      tags: ['minimal', 'modern', 'contemporary', 'clean'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    },
    {
      name: 'amber-minimal',
      title: 'Amber Minimal',
      description: 'Warm amber accents',
      file: 'amber-minimal.css',
      path: 'templates/ui/themes/amber-minimal.css',
      defaultOutput: 'src/themes/amber-minimal.css',
      tags: ['minimal', 'warm', 'amber', 'orange'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    },
    {
      name: 'mocks',
      title: 'Mocks Theme',
      description: 'Theme for mockups and prototypes',
      file: 'mocks.css',
      path: 'templates/ui/themes/mocks.css',
      defaultOutput: 'src/themes/mocks.css',
      tags: ['mockup', 'prototype', 'design'],
      features: ['dark-mode', 'tailwind-v4', 'spartan-ng', 'oklch']
    }
  ],
  components: [
    {
      name: 'stepper',
      title: 'Stepper Component',
      description: 'Multi-step form component with progress indicator',
      path: 'templates/ui/components/stepper',
      defaultOutput: 'src/app/components/stepper',
      tags: ['form', 'wizard', 'multi-step', 'progress'],
      dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card'],
      type: 'grg-component',
      prefix: 'grg'
    }
  ],
  layouts: [
    {
      name: 'dashboard',
      title: 'Dashboard Layout',
      description: 'Full dashboard layout with sidebar and header',
      path: 'templates/ui/layouts/dashboard',
      defaultOutput: 'src/app/layouts/dashboard',
      tags: ['dashboard', 'admin', 'sidebar', 'navigation'],
      dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card', '@spartan-ng/helm/navigation-menu']
    },
    {
      name: 'auth',
      title: 'Authentication Layout',
      description: 'Authentication pages layout (login, signup, forgot password)',
      path: 'templates/ui/layouts/auth',
      defaultOutput: 'src/app/layouts/auth',
      tags: ['auth', 'login', 'signup', 'authentication'],
      dependencies: ['@spartan-ng/helm/button', '@spartan-ng/helm/card', '@spartan-ng/helm/form-field']
    }
  ],
  examples: {
    all: {
      name: 'all',
      title: 'All Spartan-NG Examples',
      description: 'Complete collection of 50+ Spartan-NG component examples with usage patterns and variants',
      path: 'templates/spartan-examples',
      defaultOutput: 'src/app/spartan-examples',
      tags: ['examples', 'spartan-ng', 'all', 'reference'],
      count: '50+',
      purpose: 'Learning and reference for developers and LLMs'
    },
    components: [
      {
        name: 'accordion',
        title: 'Accordion Examples',
        description: 'Collapsible content sections examples',
        path: 'templates/spartan-examples/components/(accordion)',
        defaultOutput: 'src/app/examples/accordion',
        tags: ['accordion', 'collapsible', 'expand']
      },
      {
        name: 'alert',
        title: 'Alert Examples',
        description: 'Status messages and notifications examples',
        path: 'templates/spartan-examples/components/(alert)',
        defaultOutput: 'src/app/examples/alert',
        tags: ['alert', 'notification', 'message']
      },
      {
        name: 'alert-dialog',
        title: 'Alert Dialog Examples',
        description: 'Confirmation and alert dialogs examples',
        path: 'templates/spartan-examples/components/(alert-dialog)',
        defaultOutput: 'src/app/examples/alert-dialog',
        tags: ['dialog', 'alert', 'confirmation', 'modal']
      },
      {
        name: 'button',
        title: 'Button Examples',
        description: 'Interactive buttons with multiple variants examples',
        path: 'templates/spartan-examples/components/(button)',
        defaultOutput: 'src/app/examples/button',
        tags: ['button', 'action', 'interactive']
      },
      {
        name: 'card',
        title: 'Card Examples',
        description: 'Content containers with header, content, and footer examples',
        path: 'templates/spartan-examples/components/(card)',
        defaultOutput: 'src/app/examples/card',
        tags: ['card', 'container', 'layout']
      },
      {
        name: 'dialog',
        title: 'Dialog Examples',
        description: 'Modal dialogs and popups examples',
        path: 'templates/spartan-examples/components/(dialog)',
        defaultOutput: 'src/app/examples/dialog',
        tags: ['dialog', 'modal', 'popup', 'overlay']
      },
      {
        name: 'form-field',
        title: 'Form Field Examples',
        description: 'Complete form fields with validation examples',
        path: 'templates/spartan-examples/components/(form-field)',
        defaultOutput: 'src/app/examples/form-field',
        tags: ['form', 'input', 'validation']
      },
      {
        name: 'input',
        title: 'Input Examples',
        description: 'Form input fields examples',
        path: 'templates/spartan-examples/components/(input)',
        defaultOutput: 'src/app/examples/input',
        tags: ['input', 'form', 'text']
      },
      {
        name: 'select',
        title: 'Select Examples',
        description: 'Dropdown selection controls examples',
        path: 'templates/spartan-examples/components/(select)',
        defaultOutput: 'src/app/examples/select',
        tags: ['select', 'dropdown', 'form']
      },
      {
        name: 'table',
        title: 'Table Examples',
        description: 'Data tables examples',
        path: 'templates/spartan-examples/components/(table)',
        defaultOutput: 'src/app/examples/table',
        tags: ['table', 'data', 'grid']
      },
      {
        name: 'data-table',
        title: 'Data Table Examples',
        description: 'Advanced data tables with sorting and filtering examples',
        path: 'templates/spartan-examples/components/(data-table)',
        defaultOutput: 'src/app/examples/data-table',
        tags: ['table', 'data', 'sorting', 'filtering', 'advanced']
      }
    ]
  }
};

const REPO = 'Genesis-Research/grg-kit';

module.exports = { RESOURCES, REPO };
