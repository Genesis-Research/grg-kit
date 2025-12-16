import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideMail,
  lucideLock,
  lucideUser,
  lucideCalendar,
  lucideCheck,
  lucideX,
  lucidePlus,
  lucideSearch,
  lucideMoreHorizontal,
  lucideTrash2,
  lucidePencil,
  lucideEye,
  lucideArrowUpDown,
  lucideChevronUp,
  lucideCircleCheck,
  lucideCircleAlert,
  lucideBell,
  lucideSettings,
  lucideLogOut,
  lucideFileText,
  lucideImage,
  lucideFolder,
  lucideInfo,
  lucideCreditCard,
  lucideWallet,
  lucideBuilding,
  lucideVolume2,
  lucideSun,
  lucideZoomIn,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { BrnAlertDialogImports } from '@spartan-ng/brain/alert-dialog';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmSliderImports } from '@spartan-ng/helm/slider';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { BrnTooltipContentTemplate } from '@spartan-ng/brain/tooltip';

interface TableUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  selected: boolean;
}

interface ListItem {
  id: number;
  name: string;
  type: 'file' | 'image' | 'folder';
  size: string;
  modified: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmInputImports,
    HlmCheckboxImports,
    HlmLabelImports,
    HlmCardImports,
    HlmBadgeImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmDatePickerImports,
    HlmFormFieldImports,
    HlmTableImports,
    BrnDialogImports,
    HlmDialogImports,
    HlmSwitchImports,
    HlmSeparatorImports,
    HlmAvatarImports,
    HlmAlertImports,
    BrnAlertDialogImports,
    HlmAlertDialogImports,
    HlmRadioGroupImports,
    HlmSliderImports,
    BrnPopoverImports,
    HlmPopoverImports,
    HlmCalendarImports,
    HlmProgressImports,
    HlmTooltipImports,
    BrnTooltipContentTemplate,
  ],
  viewProviders: [
    provideIcons({
      lucideChevronDown,
      lucideMail,
      lucideLock,
      lucideUser,
      lucideCalendar,
      lucideCheck,
      lucideX,
      lucidePlus,
      lucideSearch,
      lucideMoreHorizontal,
      lucideTrash2,
      lucidePencil,
      lucideEye,
      lucideArrowUpDown,
      lucideChevronUp,
      lucideCircleCheck,
      lucideCircleAlert,
      lucideBell,
      lucideSettings,
      lucideLogOut,
      lucideFileText,
      lucideImage,
      lucideFolder,
      lucideInfo,
      lucideCreditCard,
      lucideWallet,
      lucideBuilding,
      lucideVolume2,
      lucideSun,
      lucideZoomIn,
    }),
  ],
  template: `
    <div class="min-h-screen bg-background p-6 md:p-10">
      <!-- Header -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold tracking-tight">Showcase</h1>
        <p class="mt-2 text-lg text-muted-foreground">A comprehensive demo of components working together</p>
      </div>

      <!-- Main Grid -->
      <div class="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <!-- Login Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Login</h3>
            <p hlmCardDescription>Enter your credentials to access your account</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <div class="space-y-2">
              <label hlmLabel for="login-email">Email</label>
              <div class="relative">
                <ng-icon hlm name="lucideMail" size="sm" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input hlmInput type="email" id="login-email" placeholder="name@example.com" class="pl-10 w-full" />
              </div>
            </div>
            <div class="space-y-2">
              <label hlmLabel for="login-password">Password</label>
              <div class="relative">
                <ng-icon hlm name="lucideLock" size="sm" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input hlmInput type="password" id="login-password" placeholder="••••••••" class="pl-10 w-full" />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <hlm-checkbox id="remember" />
                <span class="text-sm">Remember me</span>
              </label>
              <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
          </div>
          <div hlmCardFooter class="flex-col gap-3">
            <button hlmBtn class="w-full">Sign In</button>
            <p class="text-sm text-muted-foreground text-center">
              Don't have an account? <a href="#" class="text-primary hover:underline">Sign up</a>
            </p>
          </div>
        </section>

        <!-- Sign Up Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Create Account</h3>
            <p hlmCardDescription>Fill in your details to get started</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <label hlmLabel for="first-name">First Name</label>
                <input hlmInput id="first-name" placeholder="John" />
              </div>
              <div class="space-y-2">
                <label hlmLabel for="last-name">Last Name</label>
                <input hlmInput id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div class="space-y-2">
              <label hlmLabel for="signup-email">Email</label>
              <input hlmInput type="email" id="signup-email" placeholder="name@example.com" />
            </div>
            <div class="space-y-2">
              <label hlmLabel for="signup-password">Password</label>
              <input hlmInput type="password" id="signup-password" placeholder="Create a password" />
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <hlm-checkbox id="terms" />
              <span class="text-sm">I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a></span>
            </label>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full">Create Account</button>
          </div>
        </section>

        <!-- Select & Date Picker Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Booking Details</h3>
            <p hlmCardDescription>Select your preferences</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <div class="space-y-2">
              <label hlmLabel>Category</label>
              <brn-select class="w-full" placeholder="Select category">
                <hlm-select-trigger class="w-full">
                  <hlm-select-value />
                </hlm-select-trigger>
                <hlm-select-content>
                  <hlm-option value="business">Business</hlm-option>
                  <hlm-option value="personal">Personal</hlm-option>
                  <hlm-option value="education">Education</hlm-option>
                  <hlm-option value="healthcare">Healthcare</hlm-option>
                </hlm-select-content>
              </brn-select>
            </div>
            <div class="space-y-2">
              <label hlmLabel>Priority</label>
              <brn-select class="w-full" placeholder="Select priority">
                <hlm-select-trigger class="w-full">
                  <hlm-select-value />
                </hlm-select-trigger>
                <hlm-select-content>
                  <hlm-option value="low">Low</hlm-option>
                  <hlm-option value="medium">Medium</hlm-option>
                  <hlm-option value="high">High</hlm-option>
                  <hlm-option value="urgent">Urgent</hlm-option>
                </hlm-select-content>
              </brn-select>
            </div>
            <div class="space-y-2">
              <label hlmLabel>Start Date</label>
              <hlm-date-picker buttonId="start-date" [min]="minDate" [max]="maxDate">
                <span>Pick a date</span>
              </hlm-date-picker>
            </div>
            <div class="space-y-2">
              <label hlmLabel>End Date</label>
              <hlm-date-picker buttonId="end-date" [min]="minDate" [max]="maxDate">
                <span>Pick a date</span>
              </hlm-date-picker>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full">Confirm Booking</button>
          </div>
        </section>

        <!-- File List Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Recent Files</h3>
            <p hlmCardDescription>Your recently accessed documents</p>
          </div>
          <div hlmCardContent class="flex-1">
            <div class="space-y-2">
              @for (item of listItems; track item.id) {
                <div class="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    @switch (item.type) {
                      @case ('file') {
                        <ng-icon hlm name="lucideFileText" size="sm" class="text-primary" />
                      }
                      @case ('image') {
                        <ng-icon hlm name="lucideImage" size="sm" class="text-primary" />
                      }
                      @case ('folder') {
                        <ng-icon hlm name="lucideFolder" size="sm" class="text-primary" />
                      }
                    }
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">{{ item.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ item.size }} • {{ item.modified }}</p>
                  </div>
                  <button hlmBtn variant="ghost" size="icon" class="shrink-0">
                    <ng-icon hlm name="lucideMoreHorizontal" size="sm" />
                  </button>
                </div>
              }
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">
              <ng-icon hlm name="lucidePlus" size="sm" />
              Upload File
            </button>
          </div>
        </section>

        <!-- Form with Validation Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Contact Form</h3>
            <p hlmCardDescription>Send us a message</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <hlm-form-field>
              <input hlmInput [formControl]="nameControl" placeholder="Your name" />
              <hlm-hint>Enter your full name</hlm-hint>
              <hlm-error>Name is required</hlm-error>
            </hlm-form-field>
            <hlm-form-field>
              <input hlmInput [formControl]="emailControl" type="email" placeholder="Email address" />
              <hlm-hint>We'll never share your email</hlm-hint>
              <hlm-error>Please enter a valid email</hlm-error>
            </hlm-form-field>
            <div class="space-y-2">
              <label hlmLabel>Subject</label>
              <brn-select class="w-full" placeholder="Select subject">
                <hlm-select-trigger class="w-full">
                  <hlm-select-value />
                </hlm-select-trigger>
                <hlm-select-content>
                  <hlm-option value="general">General Inquiry</hlm-option>
                  <hlm-option value="support">Technical Support</hlm-option>
                  <hlm-option value="billing">Billing Question</hlm-option>
                  <hlm-option value="feedback">Feedback</hlm-option>
                </hlm-select-content>
              </brn-select>
            </div>
            <hlm-form-field>
              <textarea hlmInput [formControl]="messageControl" placeholder="Your message" rows="3"></textarea>
              <hlm-hint>Minimum 10 characters</hlm-hint>
              <hlm-error>Message must be at least 10 characters</hlm-error>
            </hlm-form-field>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full">Send Message</button>
          </div>
        </section>

        <!-- Settings Card with Switches -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Notification Settings</h3>
            <p hlmCardDescription>Manage your preferences</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label hlmLabel class="font-medium">Email Notifications</label>
                <p class="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <hlm-switch [(checked)]="emailNotifications" />
            </div>
            <hlm-separator />
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label hlmLabel class="font-medium">Push Notifications</label>
                <p class="text-sm text-muted-foreground">Receive push alerts</p>
              </div>
              <hlm-switch [(checked)]="pushNotifications" />
            </div>
            <hlm-separator />
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label hlmLabel class="font-medium">Marketing Emails</label>
                <p class="text-sm text-muted-foreground">Receive promotional content</p>
              </div>
              <hlm-switch [(checked)]="marketingEmails" />
            </div>
            <hlm-separator />
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label hlmLabel class="font-medium">Security Alerts</label>
                <p class="text-sm text-muted-foreground">Important security updates</p>
              </div>
              <hlm-switch [(checked)]="securityAlerts" />
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full">Save Preferences</button>
          </div>
        </section>

        <!-- Table with Checkboxes - Spans 2 columns -->
        <section hlmCard class="md:col-span-2 flex flex-col">
          <div hlmCardHeader>
            <div class="flex items-center justify-between">
              <div>
                <h3 hlmCardTitle>Team Members</h3>
                <p hlmCardDescription>Manage your team and their roles</p>
              </div>
              <hlm-dialog>
                <button brnDialogTrigger hlmBtn>
                  <ng-icon hlm name="lucidePlus" size="sm" />
                  Add Member
                </button>
                <hlm-dialog-content *brnDialogContent="let ctx" class="sm:max-w-md">
                  <hlm-dialog-header>
                    <h3 hlmDialogTitle>Add Team Member</h3>
                    <p hlmDialogDescription>Invite a new member to your team</p>
                  </hlm-dialog-header>
                  <div class="grid gap-4 py-4">
                    <div class="space-y-2">
                      <label hlmLabel for="member-name">Name</label>
                      <input hlmInput id="member-name" placeholder="Enter name" />
                    </div>
                    <div class="space-y-2">
                      <label hlmLabel for="member-email">Email</label>
                      <input hlmInput id="member-email" type="email" placeholder="Enter email" />
                    </div>
                    <div class="space-y-2">
                      <label hlmLabel>Role</label>
                      <brn-select class="w-full" placeholder="Select role">
                        <hlm-select-trigger class="w-full">
                          <hlm-select-value />
                        </hlm-select-trigger>
                        <hlm-select-content>
                          <hlm-option value="admin">Admin</hlm-option>
                          <hlm-option value="editor">Editor</hlm-option>
                          <hlm-option value="viewer">Viewer</hlm-option>
                        </hlm-select-content>
                      </brn-select>
                    </div>
                  </div>
                  <hlm-dialog-footer>
                    <button hlmBtn variant="outline" (click)="ctx.close()">Cancel</button>
                    <button hlmBtn (click)="ctx.close()">Add Member</button>
                  </hlm-dialog-footer>
                </hlm-dialog-content>
              </hlm-dialog>
            </div>
          </div>
          <div hlmCardContent class="flex-1">
            <div class="overflow-hidden rounded-md border">
              <div hlmTableContainer>
                <table hlmTable>
                  <thead hlmTHead>
                    <tr hlmTr>
                      <th hlmTh class="w-12">
                        <hlm-checkbox
                          [checked]="allSelected()"
                          [indeterminate]="someSelected()"
                          (checkedChange)="toggleAll($event)"
                        />
                      </th>
                      <th hlmTh>Name</th>
                      <th hlmTh>Email</th>
                      <th hlmTh>Role</th>
                      <th hlmTh>Status</th>
                      <th hlmTh class="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody hlmTBody>
                    @for (user of tableUsers; track user.id) {
                      <tr hlmTr [attr.data-state]="user.selected && 'selected'">
                        <td hlmTd>
                          <hlm-checkbox
                            [checked]="user.selected"
                            (checkedChange)="toggleUser(user, $event)"
                          />
                        </td>
                        <td hlmTd>
                          <div class="flex items-center gap-3">
                            <hlm-avatar variant="small">
                              <img hlmAvatarImage [src]="'https://api.dicebear.com/7.x/initials/svg?seed=' + user.name" [alt]="user.name" />
                              <span hlmAvatarFallback>{{ user.name.charAt(0) }}</span>
                            </hlm-avatar>
                            <span class="font-medium">{{ user.name }}</span>
                          </div>
                        </td>
                        <td hlmTd class="text-muted-foreground">{{ user.email }}</td>
                        <td hlmTd>{{ user.role }}</td>
                        <td hlmTd>
                          <span hlmBadge
                            [variant]="user.status === 'Active' ? 'default' : user.status === 'Pending' ? 'secondary' : 'outline'">
                            {{ user.status }}
                          </span>
                        </td>
                        <td hlmTd>
                          <div class="flex justify-end gap-1">
                            <button hlmBtn variant="ghost" size="icon" class="h-8 w-8">
                              <ng-icon hlm name="lucideEye" size="sm" />
                            </button>
                            <button hlmBtn variant="ghost" size="icon" class="h-8 w-8">
                              <ng-icon hlm name="lucidePencil" size="sm" />
                            </button>
                            <hlm-alert-dialog>
                              <button hlmBtn variant="ghost" size="icon" class="h-8 w-8 text-destructive hover:text-destructive" brnAlertDialogTrigger>
                                <ng-icon hlm name="lucideTrash2" size="sm" />
                              </button>
                              <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
                                <hlm-alert-dialog-header>
                                  <h3 hlmAlertDialogTitle>Remove {{ user.name }}?</h3>
                                  <p hlmAlertDialogDescription>
                                    This will remove the user from your team. They will lose access to all shared resources.
                                  </p>
                                </hlm-alert-dialog-header>
                                <hlm-alert-dialog-footer>
                                  <button hlmAlertDialogCancel (click)="ctx.close()">Cancel</button>
                                  <button hlmAlertDialogAction (click)="ctx.close()">Remove</button>
                                </hlm-alert-dialog-footer>
                              </hlm-alert-dialog-content>
                            </hlm-alert-dialog>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div class="mt-3 text-sm text-muted-foreground">
              {{ selectedCount() }} of {{ tableUsers.length }} row(s) selected
            </div>
          </div>
        </section>

        <!-- Alerts Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>System Alerts</h3>
            <p hlmCardDescription>Important notifications</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-3">
            <div hlmAlert>
              <ng-icon hlm hlmAlertIcon name="lucideCircleCheck" />
              <h4 hlmAlertTitle>Success!</h4>
              <p hlmAlertDescription>Your changes have been saved successfully.</p>
            </div>
            <div hlmAlert variant="destructive">
              <ng-icon hlm hlmAlertIcon name="lucideCircleAlert" />
              <h4 hlmAlertTitle>Error</h4>
              <p hlmAlertDescription>There was a problem with your request.</p>
            </div>
          </div>
        </section>

        <!-- Radio Groups Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Payment Method</h3>
            <p hlmCardDescription>Select your preferred payment option</p>
          </div>
          <div hlmCardContent class="flex-1">
            <hlm-radio-group class="space-y-3" [(ngModel)]="paymentMethod">
              <div class="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50" [class.border-primary]="paymentMethod === 'card'">
                <hlm-radio value="card" id="pay-card">
                  <hlm-radio-indicator indicator />
                </hlm-radio>
                <label for="pay-card" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <ng-icon hlm name="lucideCreditCard" size="sm" class="text-muted-foreground" />
                    <span class="font-medium">Credit Card</span>
                  </div>
                  <p class="text-sm text-muted-foreground">Pay with Visa, Mastercard, or Amex</p>
                </label>
              </div>
              <div class="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50" [class.border-primary]="paymentMethod === 'wallet'">
                <hlm-radio value="wallet" id="pay-wallet">
                  <hlm-radio-indicator indicator />
                </hlm-radio>
                <label for="pay-wallet" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <ng-icon hlm name="lucideWallet" size="sm" class="text-muted-foreground" />
                    <span class="font-medium">Digital Wallet</span>
                  </div>
                  <p class="text-sm text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
                </label>
              </div>
              <div class="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50" [class.border-primary]="paymentMethod === 'bank'">
                <hlm-radio value="bank" id="pay-bank">
                  <hlm-radio-indicator indicator />
                </hlm-radio>
                <label for="pay-bank" class="flex-1 cursor-pointer">
                  <div class="flex items-center gap-2">
                    <ng-icon hlm name="lucideBuilding" size="sm" class="text-muted-foreground" />
                    <span class="font-medium">Bank Transfer</span>
                  </div>
                  <p class="text-sm text-muted-foreground">Direct bank account transfer</p>
                </label>
              </div>
            </hlm-radio-group>
          </div>
          <div hlmCardFooter>
            <button hlmBtn class="w-full">Continue to Payment</button>
          </div>
        </section>

        <!-- Sliders Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Preferences</h3>
            <p hlmCardDescription>Adjust your settings</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-6">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideVolume2" size="sm" class="text-muted-foreground" />
                  <label hlmLabel>Volume</label>
                </div>
                <span class="text-sm text-muted-foreground w-12 text-right">{{ volumeValue() }}%</span>
              </div>
              <hlm-slider [(value)]="volumeValue" [max]="100" [step]="1" />
            </div>
            <hlm-separator />
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideSun" size="sm" class="text-muted-foreground" />
                  <label hlmLabel>Brightness</label>
                </div>
                <span class="text-sm text-muted-foreground w-12 text-right">{{ brightnessValue() }}%</span>
              </div>
              <hlm-slider [(value)]="brightnessValue" [max]="100" [step]="1" />
            </div>
            <hlm-separator />
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <ng-icon hlm name="lucideZoomIn" size="sm" class="text-muted-foreground" />
                  <label hlmLabel>Zoom Level</label>
                </div>
                <span class="text-sm text-muted-foreground w-12 text-right">{{ zoomValue() }}%</span>
              </div>
              <hlm-slider [(value)]="zoomValue" [min]="50" [max]="200" [step]="10" />
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">Reset to Defaults</button>
          </div>
        </section>

        <!-- Popover Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Quick Actions</h3>
            <p hlmCardDescription>Popovers and tooltips</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-4">
            <div class="space-y-2">
              <label hlmLabel>User Profile Popover</label>
              <brn-popover sideOffset="5">
                <button brnPopoverTrigger hlmBtn variant="outline" class="w-full justify-start">
                  <ng-icon hlm name="lucideUser" size="sm" />
                  View Profile
                </button>
                <div hlmPopoverContent class="w-72" *brnPopoverContent="let ctx">
                  <div class="flex gap-4">
                    <hlm-avatar>
                      <img hlmAvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=John" alt="John" />
                      <span hlmAvatarFallback>JD</span>
                    </hlm-avatar>
                    <div class="space-y-1">
                      <h4 class="font-medium leading-none">John Doe</h4>
                      <p class="text-sm text-muted-foreground">john.doe&#64;example.com</p>
                      <p class="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <hlm-separator class="my-3" />
                  <div class="flex gap-2">
                    <button hlmBtn size="sm" class="flex-1">Message</button>
                    <button hlmBtn size="sm" variant="outline" class="flex-1">Follow</button>
                  </div>
                </div>
              </brn-popover>
            </div>
            <div class="space-y-2">
              <label hlmLabel>Settings Popover</label>
              <brn-popover sideOffset="5">
                <button brnPopoverTrigger hlmBtn variant="outline" class="w-full justify-start">
                  <ng-icon hlm name="lucideSettings" size="sm" />
                  Quick Settings
                </button>
                <div hlmPopoverContent class="w-64" *brnPopoverContent="let ctx">
                  <div class="space-y-4">
                    <h4 class="font-medium leading-none">Quick Settings</h4>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <label hlmLabel class="text-sm">Dark Mode</label>
                        <hlm-switch />
                      </div>
                      <div class="flex items-center justify-between">
                        <label hlmLabel class="text-sm">Notifications</label>
                        <hlm-switch [checked]="true" />
                      </div>
                      <div class="flex items-center justify-between">
                        <label hlmLabel class="text-sm">Sound Effects</label>
                        <hlm-switch />
                      </div>
                    </div>
                  </div>
                </div>
              </brn-popover>
            </div>
            <hlm-separator />
            <div class="space-y-2">
              <label hlmLabel>Tooltips</label>
              <div class="flex gap-2">
                <hlm-tooltip>
                  <button hlmTooltipTrigger hlmBtn variant="outline" size="icon">
                    <ng-icon hlm name="lucideInfo" size="sm" />
                  </button>
                  <span *brnTooltipContent>More information</span>
                </hlm-tooltip>
                <hlm-tooltip>
                  <button hlmTooltipTrigger hlmBtn variant="outline" size="icon">
                    <ng-icon hlm name="lucideSettings" size="sm" />
                  </button>
                  <span *brnTooltipContent>Open settings</span>
                </hlm-tooltip>
                <hlm-tooltip>
                  <button hlmTooltipTrigger hlmBtn variant="outline" size="icon">
                    <ng-icon hlm name="lucideBell" size="sm" />
                  </button>
                  <span *brnTooltipContent>View notifications</span>
                </hlm-tooltip>
              </div>
            </div>
          </div>
        </section>

        <!-- Calendar Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Calendar</h3>
            <p hlmCardDescription>Select a date</p>
          </div>
          <div hlmCardContent class="flex-1 flex items-center justify-center">
            <hlm-calendar [(date)]="selectedDate" [min]="minDate" [max]="maxDate" />
          </div>
          <div hlmCardFooter class="flex-col gap-2">
            <p class="text-sm text-muted-foreground w-full">
              Selected: <span class="font-medium text-foreground">{{ selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            </p>
          </div>
        </section>

        <!-- Progress Card -->
        <section hlmCard class="flex flex-col">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Project Progress</h3>
            <p hlmCardDescription>Track your milestones</p>
          </div>
          <div hlmCardContent class="flex-1 space-y-5">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Design Phase</span>
                <span class="text-muted-foreground">100%</span>
              </div>
              <hlm-progress [value]="100" />
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Development</span>
                <span class="text-muted-foreground">75%</span>
              </div>
              <hlm-progress [value]="75" />
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Testing</span>
                <span class="text-muted-foreground">40%</span>
              </div>
              <hlm-progress [value]="40" />
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Deployment</span>
                <span class="text-muted-foreground">10%</span>
              </div>
              <hlm-progress [value]="10" />
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">View Details</button>
          </div>
        </section>

      </div>
    </div>
  `,
})
export class ShowcaseComponent {
  // Date picker bounds
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2030, 11, 31);

  // Form controls
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  messageControl = new FormControl('', [Validators.required, Validators.minLength(10)]);

  // Switch states
  emailNotifications = signal(true);
  pushNotifications = signal(true);
  marketingEmails = signal(false);
  securityAlerts = signal(true);

  // Radio group
  paymentMethod = 'card';

  // Slider values
  volumeValue = signal(75);
  brightnessValue = signal(60);
  zoomValue = signal(100);

  // Calendar
  selectedDate = new Date();

  // List items
  listItems: ListItem[] = [
    { id: 1, name: 'Project Proposal.pdf', type: 'file', size: '2.4 MB', modified: '2 hours ago' },
    { id: 2, name: 'Design Assets', type: 'folder', size: '156 MB', modified: 'Yesterday' },
    { id: 3, name: 'Screenshot.png', type: 'image', size: '1.2 MB', modified: '3 days ago' },
    { id: 4, name: 'Meeting Notes.docx', type: 'file', size: '45 KB', modified: 'Last week' },
  ];

  // Table users
  tableUsers: TableUser[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', selected: false },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Pending', selected: false },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Inactive', selected: false },
    { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', selected: false },
  ];

  allSelected() {
    return this.tableUsers.every(u => u.selected);
  }

  someSelected() {
    const selected = this.tableUsers.filter(u => u.selected).length;
    return selected > 0 && selected < this.tableUsers.length;
  }

  selectedCount() {
    return this.tableUsers.filter(u => u.selected).length;
  }

  toggleAll(checked: boolean) {
    this.tableUsers.forEach(u => u.selected = checked);
  }

  toggleUser(user: TableUser, checked: boolean) {
    user.selected = checked;
  }
}
