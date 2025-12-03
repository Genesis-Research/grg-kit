import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucidePlus,
  lucideMail,
  lucideLoader2,
  lucideCircleCheck,
  lucideCircleAlert,
  lucideInfo,
  lucideUser,
  lucideCog,
  lucideLogOut,
  lucideTrash,
  lucideSearch,
  lucideEye,
  lucideEyeOff,
  lucideDollarSign,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnAlertDialogImports } from '@spartan-ng/brain/alert-dialog';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { BrnNavigationMenuImports } from '@spartan-ng/brain/navigation-menu';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmScrollAreaImports } from '@spartan-ng/helm/scroll-area';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import {
  lucideBold,
  lucideItalic,
  lucideUnderline,
  lucideAlignLeft,
  lucideAlignCenter,
  lucideAlignRight,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmInputImports,
    HlmCheckboxImports,
    HlmAccordionImports,
    HlmBadgeImports,
    HlmLabelImports,
    HlmCardImports,
    HlmAlertImports,
    BrnSelectImports,
    HlmSelectImports,
    BrnAlertDialogImports,
    HlmAlertDialogImports,
    HlmDropdownMenuImports,
    HlmFieldImports,
    HlmFormFieldImports,
    HlmInputGroupImports,
    HlmCalendarImports,
    HlmDatePickerImports,
    BrnPopoverImports,
    HlmPopoverImports,
    BrnNavigationMenuImports,
    HlmNavigationMenuImports,
    HlmSidebarImports,
    HlmScrollAreaImports,
    HlmSliderImports,
    HlmToasterImports,
    HlmSpinnerImports,
    HlmSwitchImports,
    HlmTooltipImports,
    BrnTooltipContentTemplate,
    HlmToggleImports,
    HlmTabsImports,
  ],
  viewProviders: [
    provideIcons({
      lucideChevronDown,
      lucidePlus,
      lucideMail,
      lucideLoader2,
      lucideCircleCheck,
      lucideCircleAlert,
      lucideInfo,
      lucideUser,
      lucideCog,
      lucideLogOut,
      lucideTrash,
      lucideSearch,
      lucideEye,
      lucideEyeOff,
      lucideDollarSign,
      lucideBold,
      lucideItalic,
      lucideUnderline,
      lucideAlignLeft,
      lucideAlignCenter,
      lucideAlignRight,
    }),
  ],
  template: `
    <div hlmSidebarWrapper class="min-h-[calc(100vh-8rem)]">
      <!-- Sidebar -->
      <hlm-sidebar collapsible="none" class="border-r">
        <div hlmSidebarHeader class="p-4">
          <h2 class="text-lg font-semibold">Components</h2>
          <p class="text-sm text-muted-foreground">Browse all demos</p>
        </div>
        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (item of sidebarItems; track item.id) {
                  <li hlmSidebarMenuItem>
                    <button hlmSidebarMenuButton (click)="scrollToSection(item.id)" [attr.data-active]="activeSection() === item.id">
                      <span>{{ item.title }}</span>
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </hlm-sidebar>

      <!-- Main Content -->
      <main hlmSidebarInset class="p-6 overflow-auto">
        <!-- Buttons Section -->
        <section id="buttons" hlmCard class="mb-8 scroll-mt-6">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Buttons</h3>
        <p hlmCardDescription>Button variants and sizes</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Variants -->
        <div>
          <h4 class="text-sm font-medium mb-3">Variants</h4>
          <div class="flex flex-wrap gap-3">
            <button hlmBtn>Default</button>
            <button hlmBtn variant="secondary">Secondary</button>
            <button hlmBtn variant="destructive">Destructive</button>
            <button hlmBtn variant="outline">Outline</button>
            <button hlmBtn variant="ghost">Ghost</button>
            <button hlmBtn variant="link">Link</button>
          </div>
        </div>

        <!-- Sizes -->
        <div>
          <h4 class="text-sm font-medium mb-3">Sizes</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button hlmBtn size="sm">Small</button>
            <button hlmBtn>Default</button>
            <button hlmBtn size="lg">Large</button>
          </div>
        </div>

        <!-- With Icons -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Icons</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button hlmBtn>
              <ng-icon hlm name="lucideMail" size="sm" />
              Login with Email
            </button>
            <button hlmBtn variant="outline">
              <ng-icon hlm name="lucidePlus" size="sm" />
              Add Item
            </button>
            <button hlmBtn size="icon" variant="outline">
              <ng-icon hlm name="lucidePlus" size="sm" />
            </button>
          </div>
        </div>

        <!-- States -->
        <div>
          <h4 class="text-sm font-medium mb-3">States</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button hlmBtn disabled>Disabled</button>
            <button hlmBtn>
              <ng-icon hlm name="lucideLoader2" size="sm" class="animate-spin" />
              Loading...
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Inputs Section -->
        <section id="form-inputs" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Form Inputs</h3>
        <p hlmCardDescription>Input fields and form controls</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Inputs -->
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label hlmLabel for="email">Email</label>
            <input hlmInput type="email" id="email" placeholder="Enter your email" />
          </div>
          <div class="space-y-2">
            <label hlmLabel for="password">Password</label>
            <input hlmInput type="password" id="password" placeholder="Enter your password" />
          </div>
        </div>

        <!-- Input States -->
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label hlmLabel for="disabled">Disabled Input</label>
            <input hlmInput type="text" id="disabled" placeholder="Disabled" disabled />
          </div>
          <div class="space-y-2">
            <label hlmLabel for="readonly">Read Only</label>
            <input hlmInput type="text" id="readonly" value="Read only value" readonly />
          </div>
        </div>

        <!-- File Input -->
        <div class="space-y-2">
          <label hlmLabel for="file">File Upload</label>
          <input hlmInput type="file" id="file" />
        </div>
      </div>
    </section>

    <!-- Input Group Section -->
        <section id="input-group" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Input Group</h3>
        <p hlmCardDescription>Inputs with addons, icons, and buttons</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- With Icon -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Icons</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div hlmInputGroup>
              <input hlmInputGroupInput placeholder="Search..." />
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideSearch" size="sm" />
              </div>
            </div>
            <div hlmInputGroup>
              <input hlmInputGroupInput placeholder="Enter amount" />
              <div hlmInputGroupAddon>
                <ng-icon hlm name="lucideDollarSign" size="sm" />
              </div>
              <div hlmInputGroupAddon align="inline-end">.00</div>
            </div>
          </div>
        </div>

        <!-- With Text Addon -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Text Addons</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div hlmInputGroup>
              <input hlmInputGroupInput placeholder="username" />
              <div hlmInputGroupAddon>
                <span hlmInputGroupText>&#64;</span>
              </div>
            </div>
            <div hlmInputGroup>
              <input hlmInputGroupInput placeholder="example" class="!pl-1" />
              <div hlmInputGroupAddon>
                <span hlmInputGroupText>https://</span>
              </div>
              <div hlmInputGroupAddon align="inline-end">
                <span hlmInputGroupText>.com</span>
              </div>
            </div>
          </div>
        </div>

        <!-- With Button -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Buttons</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div hlmInputGroup>
              <input hlmInputGroupInput placeholder="Search products..." />
              <div hlmInputGroupAddon align="inline-end">
                <button hlmInputGroupButton variant="default" size="sm">Search</button>
              </div>
            </div>
            <div hlmInputGroup>
              <input hlmInputGroupInput type="password" placeholder="Password" />
              <div hlmInputGroupAddon align="inline-end">
                <button hlmInputGroupButton variant="ghost" size="icon-sm">
                  <ng-icon hlm name="lucideEye" size="sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Field Section -->
        <section id="form-field" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Form Field</h3>
        <p hlmCardDescription>Form fields with validation, hints, and errors</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Form Field -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Hint</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <hlm-form-field>
              <input hlmInput type="email" placeholder="Email" />
              <hlm-hint>We'll never share your email.</hlm-hint>
            </hlm-form-field>
            <hlm-form-field>
              <input hlmInput type="text" placeholder="Username" />
              <hlm-hint>Choose a unique username.</hlm-hint>
            </hlm-form-field>
          </div>
        </div>

        <!-- With Validation -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Validation</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <hlm-form-field>
              <input hlmInput [formControl]="emailControl" type="email" placeholder="Email" />
              <hlm-hint>Enter a valid email address.</hlm-hint>
              <hlm-error>Email is required.</hlm-error>
            </hlm-form-field>
            <hlm-form-field>
              <input hlmInput [formControl]="passwordControl" type="password" placeholder="Password" />
              <hlm-hint>Minimum 8 characters.</hlm-hint>
              <hlm-error>Password must be at least 8 characters.</hlm-error>
            </hlm-form-field>
          </div>
        </div>
      </div>
    </section>

    <!-- Field Section -->
        <section id="field" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Field</h3>
        <p hlmCardDescription>Structured form fields with labels and descriptions</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Fields -->
        <div hlmFieldGroup>
          <div hlmField>
            <label hlmFieldLabel for="field-fullname">Full Name</label>
            <input hlmInput id="field-fullname" type="text" placeholder="John Doe" />
            <p hlmFieldDescription>Your full name as it appears on official documents.</p>
          </div>
          <div hlmField>
            <label hlmFieldLabel for="field-email">Email Address</label>
            <input hlmInput id="field-email" type="email" placeholder="john&#64;example.com" />
            <p hlmFieldDescription>We'll use this for account notifications.</p>
          </div>
        </div>

        <!-- Field with Error -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Error State</h4>
          <div hlmField data-invalid="true">
            <label hlmFieldLabel for="field-username">Username</label>
            <input hlmInput id="field-username" type="text" placeholder="johndoe" aria-invalid="true" />
            <hlm-field-error>This username is already taken.</hlm-field-error>
          </div>
        </div>

        <!-- Horizontal Field -->
        <div>
          <h4 class="text-sm font-medium mb-3">Horizontal Layout</h4>
          <div class="space-y-4">
            <div hlmField orientation="horizontal">
              <hlm-checkbox id="field-marketing" />
              <label hlmFieldLabel for="field-marketing">Receive marketing emails</label>
            </div>
            <div hlmField orientation="horizontal">
              <hlm-checkbox id="field-updates" />
              <label hlmFieldLabel for="field-updates">Receive product updates</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Checkbox Section -->
        <section id="checkbox" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Checkboxes</h3>
        <p hlmCardDescription>Checkbox controls with labels</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <hlm-checkbox id="terms" [(checked)]="termsAccepted" />
            <label hlmLabel for="terms" class="cursor-pointer">Accept terms and conditions</label>
          </div>
          <div class="flex items-center gap-3">
            <hlm-checkbox id="newsletter" [(checked)]="newsletterSubscribed" />
            <label hlmLabel for="newsletter" class="cursor-pointer">Subscribe to newsletter</label>
          </div>
          <div class="flex items-center gap-3">
            <hlm-checkbox id="disabled-check" disabled />
            <label hlmLabel for="disabled-check" class="opacity-50">Disabled checkbox</label>
          </div>
          <div class="flex items-center gap-3">
            <hlm-checkbox id="indeterminate" [(indeterminate)]="isIndeterminate" />
            <label hlmLabel for="indeterminate" class="cursor-pointer">Indeterminate state</label>
          </div>
        </div>
        <div class="text-sm text-muted-foreground">
          Terms: {{ termsAccepted() ? 'Accepted' : 'Not accepted' }} |
          Newsletter: {{ newsletterSubscribed() ? 'Subscribed' : 'Not subscribed' }}
        </div>
      </div>
    </section>

    <!-- Accordion Section -->
        <section id="accordion" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Accordion</h3>
        <p hlmCardDescription>Collapsible content sections</p>
      </div>
      <div hlmCardContent>
        <div hlmAccordion class="w-full">
          <div hlmAccordionItem>
            <h3>
              <button hlmAccordionTrigger>
                Is it accessible?
                <ng-icon hlm hlmAccIcon name="lucideChevronDown" />
              </button>
            </h3>
            <hlm-accordion-content>
              Yes. It adheres to the WAI-ARIA design pattern and includes keyboard navigation support.
            </hlm-accordion-content>
          </div>
          <div hlmAccordionItem>
            <h3>
              <button hlmAccordionTrigger>
                Is it styled?
                <ng-icon hlm hlmAccIcon name="lucideChevronDown" />
              </button>
            </h3>
            <hlm-accordion-content>
              Yes. It comes with default styles that match the design system. You can customize it using Tailwind CSS classes.
            </hlm-accordion-content>
          </div>
          <div hlmAccordionItem>
            <h3>
              <button hlmAccordionTrigger>
                Is it animated?
                <ng-icon hlm hlmAccIcon name="lucideChevronDown" />
              </button>
            </h3>
            <hlm-accordion-content>
              Yes. It's animated by default with smooth height transitions, but you can disable animations if you prefer.
            </hlm-accordion-content>
          </div>
        </div>
      </div>
    </section>

    <!-- Badge Section -->
        <section id="badge" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Badges</h3>
        <p hlmCardDescription>Status indicators and labels</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Variants -->
        <div>
          <h4 class="text-sm font-medium mb-3">Variants</h4>
          <div class="flex flex-wrap gap-3">
            <span hlmBadge>Default</span>
            <span hlmBadge variant="secondary">Secondary</span>
            <span hlmBadge variant="destructive">Destructive</span>
            <span hlmBadge variant="outline">Outline</span>
          </div>
        </div>

        <!-- Use Cases -->
        <div>
          <h4 class="text-sm font-medium mb-3">Use Cases</h4>
          <div class="flex flex-wrap gap-3">
            <span hlmBadge>New</span>
            <span hlmBadge variant="secondary">In Progress</span>
            <span hlmBadge variant="destructive">Urgent</span>
            <span hlmBadge variant="outline">Draft</span>
            <span hlmBadge>v1.0.0</span>
            <span hlmBadge variant="secondary">Beta</span>
          </div>
        </div>

        <!-- As Links -->
        <div>
          <h4 class="text-sm font-medium mb-3">As Links</h4>
          <div class="flex flex-wrap gap-3">
            <a href="#" hlmBadge>Clickable</a>
            <a href="#" hlmBadge variant="secondary">Learn More</a>
            <a href="#" hlmBadge variant="outline">View Docs</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Select Section -->
        <section id="select" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Select</h3>
        <p hlmCardDescription>Dropdown selection controls</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Select -->
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Select</h4>
          <brn-select class="inline-block" placeholder="Select a fruit">
            <hlm-select-trigger class="w-56">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="apple">Apple</hlm-option>
              <hlm-option value="banana">Banana</hlm-option>
              <hlm-option value="orange">Orange</hlm-option>
              <hlm-option value="grape">Grape</hlm-option>
              <hlm-option value="mango">Mango</hlm-option>
            </hlm-select-content>
          </brn-select>
        </div>

        <!-- With Label -->
        <div class="space-y-2">
          <h4 class="text-sm font-medium mb-3">With Label</h4>
          <label hlmLabel>Choose your timezone</label>
          <brn-select class="inline-block" placeholder="Select timezone">
            <hlm-select-trigger class="w-72">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="pst">Pacific Standard Time (PST)</hlm-option>
              <hlm-option value="mst">Mountain Standard Time (MST)</hlm-option>
              <hlm-option value="cst">Central Standard Time (CST)</hlm-option>
              <hlm-option value="est">Eastern Standard Time (EST)</hlm-option>
              <hlm-option value="utc">Coordinated Universal Time (UTC)</hlm-option>
            </hlm-select-content>
          </brn-select>
        </div>

        <!-- Disabled -->
        <div>
          <h4 class="text-sm font-medium mb-3">Disabled State</h4>
          <brn-select class="inline-block" placeholder="Disabled select" disabled>
            <hlm-select-trigger class="w-56">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="option1">Option 1</hlm-option>
            </hlm-select-content>
          </brn-select>
        </div>
      </div>
    </section>

    <!-- Calendar Section -->
        <section id="calendar" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Calendar</h3>
        <p hlmCardDescription>Date selection calendar component</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Calendar -->
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Calendar</h4>
          <hlm-calendar [(date)]="selectedDate" [min]="minDate" [max]="maxDate" />
          <p class="text-sm text-muted-foreground mt-3">
            Selected: {{ selectedDate | date:'fullDate' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Date Picker Section -->
        <section id="date-picker" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Date Picker</h3>
        <p hlmCardDescription>Date input with calendar popup</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Date Picker -->
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Date Picker</h4>
          <div class="flex flex-col gap-3">
            <label hlmLabel for="dob">Date of Birth</label>
            <hlm-date-picker buttonId="dob" [min]="minDate" [max]="maxDate">
              <span>Select date</span>
            </hlm-date-picker>
          </div>
        </div>

        <!-- Multiple Date Pickers -->
        <div>
          <h4 class="text-sm font-medium mb-3">Date Range Example</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="flex flex-col gap-3">
              <label hlmLabel for="start-date">Start Date</label>
              <hlm-date-picker buttonId="start-date" [min]="minDate" [max]="maxDate">
                <span>Pick start date</span>
              </hlm-date-picker>
            </div>
            <div class="flex flex-col gap-3">
              <label hlmLabel for="end-date">End Date</label>
              <hlm-date-picker buttonId="end-date" [min]="minDate" [max]="maxDate">
                <span>Pick end date</span>
              </hlm-date-picker>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Alert Section -->
        <section id="alert" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Alerts</h3>
        <p hlmCardDescription>Status messages and notifications</p>
      </div>
      <div hlmCardContent class="space-y-4">
        <!-- Success Alert -->
        <div hlmAlert>
          <ng-icon hlm hlmAlertIcon name="lucideCircleCheck" />
          <h4 hlmAlertTitle>Success!</h4>
          <p hlmAlertDescription>Your changes have been saved successfully.</p>
        </div>

        <!-- Info Alert -->
        <div hlmAlert>
          <ng-icon hlm hlmAlertIcon name="lucideInfo" />
          <h4 hlmAlertTitle>Information</h4>
          <p hlmAlertDescription>This feature will be available in the next update.</p>
        </div>

        <!-- Destructive Alert -->
        <div hlmAlert variant="destructive">
          <ng-icon hlm hlmAlertIcon name="lucideCircleAlert" />
          <h4 hlmAlertTitle>Error</h4>
          <p hlmAlertDescription>There was a problem processing your request. Please try again.</p>
        </div>
      </div>
    </section>

    <!-- Alert Dialog Section -->
        <section id="alert-dialog" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Alert Dialog</h3>
        <p hlmCardDescription>Confirmation dialogs for important actions</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div class="flex flex-wrap gap-4">
          <!-- Basic Alert Dialog -->
          <hlm-alert-dialog>
            <button brnAlertDialogTrigger hlmBtn variant="outline">Delete Account</button>
            <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
              <hlm-alert-dialog-header>
                <h2 hlmAlertDialogTitle>Are you absolutely sure?</h2>
                <p hlmAlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </p>
              </hlm-alert-dialog-header>
              <hlm-alert-dialog-footer>
                <button hlmAlertDialogCancel (click)="ctx.close()">Cancel</button>
                <button hlmAlertDialogAction (click)="ctx.close()">Delete</button>
              </hlm-alert-dialog-footer>
            </hlm-alert-dialog-content>
          </hlm-alert-dialog>

          <!-- Discard Changes Dialog -->
          <hlm-alert-dialog>
            <button brnAlertDialogTrigger hlmBtn variant="secondary">Discard Changes</button>
            <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
              <hlm-alert-dialog-header>
                <h2 hlmAlertDialogTitle>Discard unsaved changes?</h2>
                <p hlmAlertDialogDescription>
                  You have unsaved changes. Are you sure you want to discard them? This action cannot be undone.
                </p>
              </hlm-alert-dialog-header>
              <hlm-alert-dialog-footer>
                <button hlmAlertDialogCancel (click)="ctx.close()">Keep Editing</button>
                <button hlmAlertDialogAction (click)="ctx.close()">Discard</button>
              </hlm-alert-dialog-footer>
            </hlm-alert-dialog-content>
          </hlm-alert-dialog>
        </div>
      </div>
    </section>

    <!-- Navigation Menu Section -->
        <section id="navigation-menu" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Navigation Menu</h3>
        <p hlmCardDescription>Accessible navigation menus with dropdowns</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Navigation Menu -->
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Navigation</h4>
          <nav hlmNavigationMenu>
            <ul hlmNavigationMenuList class="flex-wrap">
              <li hlmNavigationMenuItem>
                <button hlmNavigationMenuTrigger>
                  Getting Started
                  <ng-icon name="lucideChevronDown" class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" />
                </button>
                <div hlmNavigationMenuContent *brnNavigationMenuContent>
                  <ul class="grid gap-2 w-[400px] md:grid-cols-2">
                    <li>
                      <a hlmNavigationMenuLink href="#">
                        <div class="text-sm leading-none font-medium">Introduction</div>
                        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">Learn the basics and get started quickly.</p>
                      </a>
                    </li>
                    <li>
                      <a hlmNavigationMenuLink href="#">
                        <div class="text-sm leading-none font-medium">Installation</div>
                        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">Step-by-step installation guide.</p>
                      </a>
                    </li>
                    <li>
                      <a hlmNavigationMenuLink href="#">
                        <div class="text-sm leading-none font-medium">Configuration</div>
                        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">Configure your project settings.</p>
                      </a>
                    </li>
                    <li>
                      <a hlmNavigationMenuLink href="#">
                        <div class="text-sm leading-none font-medium">Examples</div>
                        <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">Browse example implementations.</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li hlmNavigationMenuItem>
                <button hlmNavigationMenuTrigger>
                  Components
                  <ng-icon name="lucideChevronDown" class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" />
                </button>
                <div hlmNavigationMenuContent *brnNavigationMenuContent>
                  <ul class="grid gap-2 w-[400px] md:grid-cols-2">
                    @for (component of navComponents; track component.title) {
                      <li>
                        <a hlmNavigationMenuLink href="#">
                          <div class="text-sm leading-none font-medium">{{ component.title }}</div>
                          <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">{{ component.description }}</p>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              </li>

              <li hlmNavigationMenuItem>
                <a hlmNavigationMenuLink href="#">Documentation</a>
              </li>

              <li hlmNavigationMenuItem>
                <a hlmNavigationMenuLink href="#">Pricing</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Simple Navigation Menu -->
        <div>
          <h4 class="text-sm font-medium mb-3">Simple Menu with Icons</h4>
          <nav hlmNavigationMenu>
            <ul hlmNavigationMenuList>
              <li hlmNavigationMenuItem>
                <button hlmNavigationMenuTrigger>
                  Account
                  <ng-icon name="lucideChevronDown" class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" />
                </button>
                <div hlmNavigationMenuContent *brnNavigationMenuContent>
                  <ul class="grid w-[200px] gap-2">
                    <li>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideUser" size="sm" />
                        Profile
                      </a>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideCog" size="sm" />
                        Settings
                      </a>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideMail" size="sm" />
                        Messages
                      </a>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideLogOut" size="sm" />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li hlmNavigationMenuItem>
                <button hlmNavigationMenuTrigger>
                  Help
                  <ng-icon name="lucideChevronDown" class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" />
                </button>
                <div hlmNavigationMenuContent *brnNavigationMenuContent>
                  <ul class="grid w-[200px] gap-2">
                    <li>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideInfo" size="sm" />
                        FAQ
                      </a>
                      <a hlmNavigationMenuLink class="cursor-pointer flex-row items-center gap-2">
                        <ng-icon hlm name="lucideMail" size="sm" />
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- Popover Section -->
        <section id="popover" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Popover</h3>
        <p hlmCardDescription>Floating content panels with rich interactions</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div class="flex flex-wrap gap-4">
          <!-- Basic Popover -->
          <div>
            <h4 class="text-sm font-medium mb-3">Basic Popover</h4>
            <brn-popover sideOffset="5">
              <button brnPopoverTrigger hlmBtn variant="outline">Open Popover</button>
              <div hlmPopoverContent class="w-80" *brnPopoverContent="let ctx">
                <div class="grid gap-4">
                  <div class="space-y-2">
                    <h4 class="font-medium leading-none">Dimensions</h4>
                    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                  </div>
                  <div class="grid gap-2">
                    <div class="grid grid-cols-3 items-center gap-4">
                      <label hlmLabel for="width">Width</label>
                      <input hlmInput id="width" value="100%" class="col-span-2 h-8" />
                    </div>
                    <div class="grid grid-cols-3 items-center gap-4">
                      <label hlmLabel for="maxWidth">Max. width</label>
                      <input hlmInput id="maxWidth" value="300px" class="col-span-2 h-8" />
                    </div>
                    <div class="grid grid-cols-3 items-center gap-4">
                      <label hlmLabel for="height">Height</label>
                      <input hlmInput id="height" value="25px" class="col-span-2 h-8" />
                    </div>
                    <div class="grid grid-cols-3 items-center gap-4">
                      <label hlmLabel for="maxHeight">Max. height</label>
                      <input hlmInput id="maxHeight" value="none" class="col-span-2 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </brn-popover>
          </div>

          <!-- Popover with User Info -->
          <div>
            <h4 class="text-sm font-medium mb-3">User Info</h4>
            <brn-popover sideOffset="5">
              <button brnPopoverTrigger hlmBtn variant="secondary">
                <ng-icon hlm name="lucideUser" size="sm" />
                View Profile
              </button>
              <div hlmPopoverContent class="w-72" *brnPopoverContent="let ctx">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ng-icon hlm name="lucideUser" size="lg" />
                  </div>
                  <div class="space-y-1">
                    <h4 class="font-medium leading-none">John Doe</h4>
                    <p class="text-sm text-muted-foreground">john.doe&#64;example.com</p>
                    <p class="text-xs text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <div class="mt-4 flex gap-2">
                  <button hlmBtn size="sm" class="flex-1">Message</button>
                  <button hlmBtn size="sm" variant="outline" class="flex-1">Follow</button>
                </div>
              </div>
            </brn-popover>
          </div>

          <!-- Popover with Settings -->
          <div>
            <h4 class="text-sm font-medium mb-3">Quick Settings</h4>
            <brn-popover sideOffset="5">
              <button brnPopoverTrigger hlmBtn size="icon" variant="ghost">
                <ng-icon hlm name="lucideCog" size="sm" />
              </button>
              <div hlmPopoverContent class="w-56" *brnPopoverContent="let ctx">
                <div class="space-y-4">
                  <h4 class="font-medium leading-none">Quick Settings</h4>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <label hlmLabel for="notifications" class="text-sm">Notifications</label>
                      <hlm-checkbox id="notifications" />
                    </div>
                    <div class="flex items-center justify-between">
                      <label hlmLabel for="darkMode" class="text-sm">Dark Mode</label>
                      <hlm-checkbox id="darkMode" />
                    </div>
                    <div class="flex items-center justify-between">
                      <label hlmLabel for="sounds" class="text-sm">Sounds</label>
                      <hlm-checkbox id="sounds" />
                    </div>
                  </div>
                </div>
              </div>
            </brn-popover>
          </div>
        </div>
      </div>
    </section>

    <!-- Dropdown Menu Section -->
        <section id="dropdown-menu" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Dropdown Menu</h3>
        <p hlmCardDescription>Contextual menus with actions</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div class="flex flex-wrap gap-4">
          <!-- Basic Dropdown -->
          <div>
            <h4 class="text-sm font-medium mb-3">Basic Menu</h4>
            <button hlmBtn variant="outline" [hlmDropdownMenuTrigger]="basicMenu">Open Menu</button>
            <ng-template #basicMenu>
              <hlm-dropdown-menu class="w-48">
                <hlm-dropdown-menu-group>
                  <button hlmDropdownMenuItem>
                    <ng-icon hlm name="lucideUser" class="mr-2" size="sm" />
                    <span>Profile</span>
                  </button>
                  <button hlmDropdownMenuItem>
                    <ng-icon hlm name="lucideCog" class="mr-2" size="sm" />
                    <span>Settings</span>
                  </button>
                  <button hlmDropdownMenuItem>
                    <ng-icon hlm name="lucideMail" class="mr-2" size="sm" />
                    <span>Messages</span>
                  </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuItem>
                  <ng-icon hlm name="lucideLogOut" class="mr-2" size="sm" />
                  <span>Log out</span>
                </button>
              </hlm-dropdown-menu>
            </ng-template>
          </div>

          <!-- Menu with Shortcuts -->
          <div>
            <h4 class="text-sm font-medium mb-3">With Shortcuts</h4>
            <button hlmBtn variant="outline" [hlmDropdownMenuTrigger]="shortcutMenu">Actions</button>
            <ng-template #shortcutMenu>
              <hlm-dropdown-menu class="w-56">
                <hlm-dropdown-menu-label>Actions</hlm-dropdown-menu-label>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                  <button hlmDropdownMenuItem>
                    <span>New File</span>
                    <hlm-dropdown-menu-shortcut>⌘N</hlm-dropdown-menu-shortcut>
                  </button>
                  <button hlmDropdownMenuItem>
                    <span>Save</span>
                    <hlm-dropdown-menu-shortcut>⌘S</hlm-dropdown-menu-shortcut>
                  </button>
                  <button hlmDropdownMenuItem>
                    <span>Export</span>
                    <hlm-dropdown-menu-shortcut>⇧⌘E</hlm-dropdown-menu-shortcut>
                  </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuItem class="text-destructive">
                  <ng-icon hlm name="lucideTrash" class="mr-2" size="sm" />
                  <span>Delete</span>
                  <hlm-dropdown-menu-shortcut>⌘⌫</hlm-dropdown-menu-shortcut>
                </button>
              </hlm-dropdown-menu>
            </ng-template>
          </div>

          <!-- Disabled Items -->
          <div>
            <h4 class="text-sm font-medium mb-3">With Disabled Items</h4>
            <button hlmBtn variant="outline" [hlmDropdownMenuTrigger]="disabledMenu">Options</button>
            <ng-template #disabledMenu>
              <hlm-dropdown-menu class="w-48">
                <button hlmDropdownMenuItem>Edit</button>
                <button hlmDropdownMenuItem>Duplicate</button>
                <button hlmDropdownMenuItem disabled>Archive</button>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuItem disabled>Delete</button>
              </hlm-dropdown-menu>
            </ng-template>
          </div>
        </div>
      </div>
    </section>

    <!-- Slider Section -->
        <section id="slider" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Slider</h3>
        <p hlmCardDescription>Range input controls for selecting values</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Slider -->
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Slider</h4>
          <div class="w-64">
            <hlm-slider [(value)]="sliderValue" />
          </div>
          <p class="text-sm text-muted-foreground mt-2">Value: {{ sliderValue() }}</p>
        </div>

        <!-- Multiple Sliders -->
        <div>
          <h4 class="text-sm font-medium mb-3">Different Values</h4>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-sm w-16">Volume</span>
              <div class="w-48">
                <hlm-slider [(value)]="volumeValue" />
              </div>
              <span class="text-sm text-muted-foreground w-8">{{ volumeValue() }}%</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm w-16">Brightness</span>
              <div class="w-48">
                <hlm-slider [(value)]="brightnessValue" />
              </div>
              <span class="text-sm text-muted-foreground w-8">{{ brightnessValue() }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Switch Section -->
        <section id="switch" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Switch</h3>
        <p hlmCardDescription>Toggle controls for on/off states</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Basic Switches -->
        <div class="space-y-4">
          <label class="flex items-center gap-3" hlmLabel>
            <hlm-switch [(checked)]="airplaneMode" />
            Airplane Mode
          </label>
          <label class="flex items-center gap-3" hlmLabel>
            <hlm-switch [(checked)]="wifiEnabled" />
            Wi-Fi
          </label>
          <label class="flex items-center gap-3" hlmLabel>
            <hlm-switch [(checked)]="bluetoothEnabled" />
            Bluetooth
          </label>
          <label class="flex items-center gap-3" hlmLabel>
            <hlm-switch disabled />
            Disabled Switch
          </label>
        </div>
        <div class="text-sm text-muted-foreground">
          Airplane: {{ airplaneMode() ? 'On' : 'Off' }} |
          Wi-Fi: {{ wifiEnabled() ? 'On' : 'Off' }} |
          Bluetooth: {{ bluetoothEnabled() ? 'On' : 'Off' }}
        </div>
      </div>
    </section>

    <!-- Spinner Section -->
        <section id="spinner" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Spinner</h3>
        <p hlmCardDescription>Loading indicators for async operations</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <!-- Spinner Sizes -->
        <div>
          <h4 class="text-sm font-medium mb-3">Sizes</h4>
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <hlm-spinner class="text-sm" />
              <span class="text-xs text-muted-foreground">Small</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <hlm-spinner class="text-base" />
              <span class="text-xs text-muted-foreground">Default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <hlm-spinner class="text-lg" />
              <span class="text-xs text-muted-foreground">Large</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <hlm-spinner class="text-2xl" />
              <span class="text-xs text-muted-foreground">XL</span>
            </div>
          </div>
        </div>

        <!-- Spinner with Text -->
        <div>
          <h4 class="text-sm font-medium mb-3">With Loading Text</h4>
          <div class="flex items-center gap-3">
            <hlm-spinner class="text-base" />
            <span class="text-sm">Loading...</span>
          </div>
        </div>

        <!-- Spinner in Button -->
        <div>
          <h4 class="text-sm font-medium mb-3">In Button</h4>
          <button hlmBtn disabled>
            <hlm-spinner class="text-sm mr-2" />
            Processing...
          </button>
        </div>
      </div>
    </section>

    <!-- Sonner (Toast) Section -->
        <section id="sonner" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Sonner (Toast)</h3>
        <p hlmCardDescription>Toast notifications for user feedback</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <hlm-toaster />
        <div>
          <h4 class="text-sm font-medium mb-3">Toast Types</h4>
          <div class="flex flex-wrap gap-3">
            <button hlmBtn variant="outline" (click)="showDefaultToast()">Default Toast</button>
            <button hlmBtn variant="outline" (click)="showSuccessToast()">Success Toast</button>
            <button hlmBtn variant="outline" (click)="showErrorToast()">Error Toast</button>
            <button hlmBtn variant="outline" (click)="showInfoToast()">Info Toast</button>
            <button hlmBtn variant="outline" (click)="showWarningToast()">Warning Toast</button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">With Action</h4>
          <button hlmBtn (click)="showActionToast()">Show Toast with Action</button>
        </div>
      </div>
    </section>

    <!-- Tooltip Section -->
        <section id="tooltip" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Tooltip</h3>
        <p hlmCardDescription>Contextual information on hover</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Tooltips</h4>
          <div class="flex flex-wrap gap-4">
            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Add to library" hlmBtn variant="outline">
                Hover me
              </button>
              <span *brnTooltipContent>Add to library</span>
            </hlm-tooltip>

            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Edit item" hlmBtn variant="secondary">
                Edit
              </button>
              <span *brnTooltipContent>Edit this item</span>
            </hlm-tooltip>

            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Delete item" hlmBtn variant="destructive">
                Delete
              </button>
              <span *brnTooltipContent>Delete permanently</span>
            </hlm-tooltip>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">Icon Buttons with Tooltips</h4>
          <div class="flex gap-2">
            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Bold" hlmBtn size="icon" variant="outline">
                <ng-icon hlm name="lucideBold" size="sm" />
              </button>
              <span *brnTooltipContent>Bold</span>
            </hlm-tooltip>

            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Italic" hlmBtn size="icon" variant="outline">
                <ng-icon hlm name="lucideItalic" size="sm" />
              </button>
              <span *brnTooltipContent>Italic</span>
            </hlm-tooltip>

            <hlm-tooltip>
              <button hlmTooltipTrigger aria-describedby="Underline" hlmBtn size="icon" variant="outline">
                <ng-icon hlm name="lucideUnderline" size="sm" />
              </button>
              <span *brnTooltipContent>Underline</span>
            </hlm-tooltip>
          </div>
        </div>
      </div>
    </section>

    <!-- Toggle Section -->
        <section id="toggle" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Toggle</h3>
        <p hlmCardDescription>Two-state buttons for toggling options</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Toggle</h4>
          <div class="flex gap-2">
            <button hlmToggle aria-label="Toggle bold">
              <ng-icon hlm name="lucideBold" size="sm" />
            </button>
            <button hlmToggle aria-label="Toggle italic">
              <ng-icon hlm name="lucideItalic" size="sm" />
            </button>
            <button hlmToggle aria-label="Toggle underline">
              <ng-icon hlm name="lucideUnderline" size="sm" />
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">Outline Variant</h4>
          <div class="flex gap-2">
            <button hlmToggle variant="outline" aria-label="Align left">
              <ng-icon hlm name="lucideAlignLeft" size="sm" />
            </button>
            <button hlmToggle variant="outline" aria-label="Align center">
              <ng-icon hlm name="lucideAlignCenter" size="sm" />
            </button>
            <button hlmToggle variant="outline" aria-label="Align right">
              <ng-icon hlm name="lucideAlignRight" size="sm" />
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">With Text</h4>
          <div class="flex gap-2">
            <button hlmToggle variant="outline" aria-label="Toggle bold">
              <ng-icon hlm name="lucideBold" size="sm" />
              Bold
            </button>
            <button hlmToggle variant="outline" aria-label="Toggle italic">
              <ng-icon hlm name="lucideItalic" size="sm" />
              Italic
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">Sizes</h4>
          <div class="flex items-center gap-2">
            <button hlmToggle size="sm" variant="outline" aria-label="Small">
              <ng-icon hlm name="lucideBold" size="sm" />
            </button>
            <button hlmToggle variant="outline" aria-label="Default">
              <ng-icon hlm name="lucideBold" size="sm" />
            </button>
            <button hlmToggle size="lg" variant="outline" aria-label="Large">
              <ng-icon hlm name="lucideBold" size="sm" />
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">Disabled</h4>
          <button hlmToggle disabled aria-label="Disabled toggle">
            <ng-icon hlm name="lucideBold" size="sm" />
          </button>
        </div>
      </div>
    </section>

    <!-- Tabs Section -->
        <section id="tabs" hlmCard class="mb-8 scroll-mt-6">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Tabs</h3>
        <p hlmCardDescription>Organize content into tabbed sections</p>
      </div>
      <div hlmCardContent class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-3">Basic Tabs</h4>
          <hlm-tabs tab="account" class="w-full max-w-md">
            <hlm-tabs-list aria-label="Account settings">
              <button hlmTabsTrigger="account">Account</button>
              <button hlmTabsTrigger="password">Password</button>
              <button hlmTabsTrigger="settings">Settings</button>
            </hlm-tabs-list>
            <div hlmTabsContent="account" class="p-4">
              <h4 class="font-medium mb-2">Account Settings</h4>
              <p class="text-sm text-muted-foreground">Manage your account details and preferences here.</p>
            </div>
            <div hlmTabsContent="password" class="p-4">
              <h4 class="font-medium mb-2">Password Settings</h4>
              <p class="text-sm text-muted-foreground">Update your password and security options.</p>
            </div>
            <div hlmTabsContent="settings" class="p-4">
              <h4 class="font-medium mb-2">General Settings</h4>
              <p class="text-sm text-muted-foreground">Configure application preferences and notifications.</p>
            </div>
          </hlm-tabs>
        </div>

        <div>
          <h4 class="text-sm font-medium mb-3">Tabs with Form</h4>
          <hlm-tabs tab="profile" class="w-full max-w-lg">
            <hlm-tabs-list aria-label="Profile tabs">
              <button hlmTabsTrigger="profile">Profile</button>
              <button hlmTabsTrigger="notifications">Notifications</button>
            </hlm-tabs-list>
            <div hlmTabsContent="profile">
              <section hlmCard class="mt-4">
                <div hlmCardHeader>
                  <h3 hlmCardTitle>Profile</h3>
                  <p hlmCardDescription>Update your profile information.</p>
                </div>
                <div hlmCardContent class="space-y-4">
                  <div class="space-y-2">
                    <label hlmLabel for="tab-name">Name</label>
                    <input hlmInput id="tab-name" value="John Doe" />
                  </div>
                  <div class="space-y-2">
                    <label hlmLabel for="tab-email">Email</label>
                    <input hlmInput id="tab-email" type="email" value="john&#64;example.com" />
                  </div>
                </div>
                <div hlmCardFooter>
                  <button hlmBtn>Save Profile</button>
                </div>
              </section>
            </div>
            <div hlmTabsContent="notifications">
              <section hlmCard class="mt-4">
                <div hlmCardHeader>
                  <h3 hlmCardTitle>Notifications</h3>
                  <p hlmCardDescription>Configure your notification preferences.</p>
                </div>
                <div hlmCardContent class="space-y-4">
                  <label class="flex items-center gap-3" hlmLabel>
                    <hlm-switch />
                    Email notifications
                  </label>
                  <label class="flex items-center gap-3" hlmLabel>
                    <hlm-switch />
                    Push notifications
                  </label>
                  <label class="flex items-center gap-3" hlmLabel>
                    <hlm-switch />
                    SMS notifications
                  </label>
                </div>
                <div hlmCardFooter>
                  <button hlmBtn>Save Preferences</button>
                </div>
              </section>
            </div>
          </hlm-tabs>
        </div>
      </div>
    </section>
      </main>
    </div>
  `,
})
export class DemosComponent {
  termsAccepted = signal(false);
  newsletterSubscribed = signal(true);
  isIndeterminate = signal(true);
  activeSection = signal('buttons');

  // Sidebar navigation items
  sidebarItems = [
    { id: 'buttons', title: 'Buttons' },
    { id: 'form-inputs', title: 'Form Inputs' },
    { id: 'input-group', title: 'Input Group' },
    { id: 'form-field', title: 'Form Field' },
    { id: 'field', title: 'Field' },
    { id: 'checkbox', title: 'Checkbox' },
    { id: 'accordion', title: 'Accordion' },
    { id: 'badge', title: 'Badge' },
    { id: 'select', title: 'Select' },
    { id: 'calendar', title: 'Calendar' },
    { id: 'date-picker', title: 'Date Picker' },
    { id: 'alert', title: 'Alert' },
    { id: 'alert-dialog', title: 'Alert Dialog' },
    { id: 'navigation-menu', title: 'Navigation Menu' },
    { id: 'popover', title: 'Popover' },
    { id: 'dropdown-menu', title: 'Dropdown Menu' },
    { id: 'slider', title: 'Slider' },
    { id: 'switch', title: 'Switch' },
    { id: 'spinner', title: 'Spinner' },
    { id: 'sonner', title: 'Sonner (Toast)' },
    { id: 'tooltip', title: 'Tooltip' },
    { id: 'toggle', title: 'Toggle' },
    { id: 'tabs', title: 'Tabs' },
  ];

  // Slider values
  sliderValue = signal(50);
  volumeValue = signal(75);
  brightnessValue = signal(60);

  // Switch values
  airplaneMode = signal(false);
  wifiEnabled = signal(true);
  bluetoothEnabled = signal(true);

  // Form controls for validation examples
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  scrollToSection(id: string) {
    this.activeSection.set(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Calendar and DatePicker
  selectedDate = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2030, 11, 31);

  // Navigation Menu components
  navComponents = [
    { title: 'Button', description: 'Interactive button with multiple variants.' },
    { title: 'Input', description: 'Text input field for forms.' },
    { title: 'Select', description: 'Dropdown selection control.' },
    { title: 'Dialog', description: 'Modal dialog for user interactions.' },
    { title: 'Card', description: 'Container for related content.' },
    { title: 'Table', description: 'Data display in rows and columns.' },
  ];

  // Toast methods
  showDefaultToast() {
    toast('Event has been created');
  }

  showSuccessToast() {
    toast.success('Successfully saved!');
  }

  showErrorToast() {
    toast.error('Something went wrong');
  }

  showInfoToast() {
    toast.info('Did you know?');
  }

  showWarningToast() {
    toast.warning('Please review your input');
  }

  showActionToast() {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    });
  }
}
