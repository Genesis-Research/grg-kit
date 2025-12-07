import { Component, signal, computed, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronRight,
  lucideCode,
  lucideEye,
  lucideBox,
  lucideLayoutGrid,
  lucideType,
  lucideToggleLeft,
  lucideCalendar,
  lucideTable,
  lucideNavigation,
  lucideMessageSquare,
  lucideMoreHorizontal,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { CodeBlockComponent } from '../shared/code-block.component';
import { componentSourceMap } from './generated-sources';

// Import all preview components
import { AccordionPreview } from '../../../libs/spartan-examples/components/(accordion)/accordion.preview';
import { AlertPreview } from '../../../libs/spartan-examples/components/(alert)/alert.preview';
import { AlertDialogPreview } from '../../../libs/spartan-examples/components/(alert-dialog)/alert-dialog.preview';
import { AspectRatioPreview } from '../../../libs/spartan-examples/components/(aspect-ratio)/aspect-ratio.preview';
import { AutocompletePreview } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete.preview';
import { AvatarPreview } from '../../../libs/spartan-examples/components/(avatar)/avatar.preview';
import { BadgePreview } from '../../../libs/spartan-examples/components/(badge)/badge.preview';
// BreadcrumbPreview excluded - missing menu dependencies
// import { BreadcrumbPreview } from '../../../libs/spartan-examples/components/(breadcrumb)/breadcrumb.preview';
import { ButtonPreview } from '../../../libs/spartan-examples/components/(button)/button.preview';
// ButtonGroupPreview excluded - missing menu dependencies
// import { ButtonGroupPreview } from '../../../libs/spartan-examples/components/(button-group)/button-group.preview';
import { CalendarPreview } from '../../../libs/spartan-examples/components/(calendar)/calendar.preview';
import { CardPreview } from '../../../libs/spartan-examples/components/(card)/card.preview';
import { CarouselPreview } from '../../../libs/spartan-examples/components/(carousel)/carousel.preview';
import { CheckboxPreview } from '../../../libs/spartan-examples/components/(checkbox)/checkbox.preview';
import { CollapsiblePreview } from '../../../libs/spartan-examples/components/(collapsible)/collapsible.preview';
import { ComboboxPreview } from '../../../libs/spartan-examples/components/(combobox)/combobox.preview';
import { CommandPreview } from '../../../libs/spartan-examples/components/(command)/command.preview';
// ContextMenuPreview excluded - missing menu dependencies
// import { ContextMenuPreview } from '../../../libs/spartan-examples/components/(context-menu)/context-menu.preview';
// DataTablePreview excluded - missing menu dependencies
// import { DataTablePreview } from '../../../libs/spartan-examples/components/(data-table)/data-table.preview';
import { DatePickerPreview } from '../../../libs/spartan-examples/components/(date-picker)/date-picker.preview';
// DialogPreview excluded - missing menu dependencies
// import { DialogPreview } from '../../../libs/spartan-examples/components/(dialog)/dialog.preview';
// DropdownPreview excluded - missing dependencies
// import { DropdownPreview } from '../../../libs/spartan-examples/components/(dropdown-menu)/dropdown-menu.preview';
import { EmptyPreview } from '../../../libs/spartan-examples/components/(empty)/empty.preview';
import { FieldPreview } from '../../../libs/spartan-examples/components/(field)/field.preview';
import { FormFieldPreview } from '../../../libs/spartan-examples/components/(form-field)/form-field.preview';
import { HoverCardPreview } from '../../../libs/spartan-examples/components/(hover-card)/hover-card.preview';
import { IconPreview } from '../../../libs/spartan-examples/components/(icon)/icon.preview';
import { InputPreview } from '../../../libs/spartan-examples/components/(input)/input.preview';
// InputGroupPreview excluded - missing menu dependencies
// import { InputGroupPreview } from '../../../libs/spartan-examples/components/(input-group)/input-group.preview';
import { InputOtpPreview } from '../../../libs/spartan-examples/components/(input-otp)/input-otp.preview';
// ItemPreview excluded - missing menu dependencies
// import { ItemPreview } from '../../../libs/spartan-examples/components/(item)/item.preview';
import { KbdPreview } from '../../../libs/spartan-examples/components/(kbd)/kbd.preview';
import { LabelPreview } from '../../../libs/spartan-examples/components/(label)/label.preview';
// MenubarPreview excluded - missing dependencies
import { NavigationMenuPreview } from '../../../libs/spartan-examples/components/(navigation-menu)/navigation-menu.preview';
import { PaginationPreview } from '../../../libs/spartan-examples/components/(pagination)/pagination.preview';
import { PopoverPreview } from '../../../libs/spartan-examples/components/(popover)/popover.preview';
import { ProgressPreview } from '../../../libs/spartan-examples/components/(progress)/progress.preview';
import { RadioGroupPreview } from '../../../libs/spartan-examples/components/(radio-group)/radio-group.preview';
import { ResizablePreviewComponent } from '../../../libs/spartan-examples/components/(resizable)/resizable.preview';
// ScrollAreaPreview excluded - missing ngx-scrollbar dependency
import { SelectPreview } from '../../../libs/spartan-examples/components/(select)/select.preview';
import { SeparatorPreview } from '../../../libs/spartan-examples/components/(separator)/separator.preview';
import { SheetPreview } from '../../../libs/spartan-examples/components/(sheet)/sheet.preview';
// SidebarPreviewComponent excluded - missing menu dependencies
// import { SidebarPreviewComponent } from '../../../libs/spartan-examples/components/(sidebar)/sidebar.preview';
import { SkeletonPreview } from '../../../libs/spartan-examples/components/(skeleton)/skeleton.preview';
import { SliderPreview } from '../../../libs/spartan-examples/components/(slider)/slider.preview';
import { SonnerPreview } from '../../../libs/spartan-examples/components/(sonner)/sonner.preview';
import { SpinnerPreview } from '../../../libs/spartan-examples/components/(spinner)/spinner.preview';
import { SwitchPreview } from '../../../libs/spartan-examples/components/(switch)/switch.preview';
import { TablePreview } from '../../../libs/spartan-examples/components/(table)/table.preview';
import { TabsPreview } from '../../../libs/spartan-examples/components/(tabs)/tabs.preview';
import { TextareaPreview } from '../../../libs/spartan-examples/components/(textarea)/textarea.preview';
import { TogglePreview } from '../../../libs/spartan-examples/components/(toggle)/toggle.preview';
import { ToggleGroupPreview } from '../../../libs/spartan-examples/components/(toggle-group)/toggle-group.preview';
import { TooltipPreview } from '../../../libs/spartan-examples/components/(tooltip)/tooltip.preview';

// Import variant example components
// Button variants
import { ButtonSecondary } from '../../../libs/spartan-examples/components/(button)/button--secondary.example';
import { ButtonDestructive } from '../../../libs/spartan-examples/components/(button)/button--destructive.example';
import { ButtonOutline } from '../../../libs/spartan-examples/components/(button)/button--outline.example';
import { ButtonGhost } from '../../../libs/spartan-examples/components/(button)/button--ghost.example';
import { ButtonLink } from '../../../libs/spartan-examples/components/(button)/button--link.example';
import { ButtonIcon } from '../../../libs/spartan-examples/components/(button)/button--icon.example';
import { ButtonWithIcon } from '../../../libs/spartan-examples/components/(button)/button--with-icon.example';
import { ButtonSpinner } from '../../../libs/spartan-examples/components/(button)/button--spinner.example';
import { ButtonAnchor } from '../../../libs/spartan-examples/components/(button)/button--anchor.example';

// Accordion variants
import { AccordionMultipleOpened } from '../../../libs/spartan-examples/components/(accordion)/accordion--multiple-opened.example';

// Alert variants
import { AlertDestructive } from '../../../libs/spartan-examples/components/(alert)/alert--destructive.example';

// Badge variants
import { BadgeLink } from '../../../libs/spartan-examples/components/(badge)/badge--link.example';

// Carousel variants
import { CarouselOrientation } from '../../../libs/spartan-examples/components/(carousel)/carousel--orientation.example';
import { CarouselSizes } from '../../../libs/spartan-examples/components/(carousel)/carousel--sizes.example';
import { CarouselSpacing } from '../../../libs/spartan-examples/components/(carousel)/carousel--spacing.example';
import { CarouselSlideCount } from '../../../libs/spartan-examples/components/(carousel)/carousel--slide-count.example';
import { CarouselPlugins } from '../../../libs/spartan-examples/components/(carousel)/carousel--plugins.example';

// Icon variants
import { IconSizePreview } from '../../../libs/spartan-examples/components/(icon)/icon--size.example';
import { IconMultipleSetsPreview } from '../../../libs/spartan-examples/components/(icon)/icon--multiple.example';
import { IconResponsivePreview } from '../../../libs/spartan-examples/components/(icon)/icon--responsive.example';

// Tooltip variants
import { TooltipSimple } from '../../../libs/spartan-examples/components/(tooltip)/tooltip--simple.example';

// Command variants
import { CommandDialog } from '../../../libs/spartan-examples/components/(command)/command--dialog.example';

// Navigation Menu variants
import { NavigationMenuVertical } from '../../../libs/spartan-examples/components/(navigation-menu)/navigation-menu--vertical.example';
import { NavigationMenuNested } from '../../../libs/spartan-examples/components/(navigation-menu)/navigation-menu--nested.example';
import { NavigationMenuControlled } from '../../../libs/spartan-examples/components/(navigation-menu)/navigation-menu--controlled.example';

// Pagination variants
import { PaginationIconOnly } from '../../../libs/spartan-examples/components/(pagination)/pagination--icon-only.example';
import { PaginationAdvanced } from '../../../libs/spartan-examples/components/(pagination)/pagination--advanced.example';
import { PaginationQueryParams } from '../../../libs/spartan-examples/components/(pagination)/pagination--query-params.example';
import { PaginationAdvancedQuery } from '../../../libs/spartan-examples/components/(pagination)/pagination--advanced-query.example';

// Autocomplete variants
// import { AutocompleteAsync } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete--async.example'; // excluded - resource API issue
import { AutocompleteConfig } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete--config.example';
import { AutocompleteCountries } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete--countries.example';
import { AutocompleteForm } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete--form.example';
import { AutocompleteTransformOptionValue } from '../../../libs/spartan-examples/components/(autocomplete)/autocomplete--transform-option-value.example';

// Calendar variants
import { CalendarMultipleExample } from '../../../libs/spartan-examples/components/(calendar)/calendar--multiple.example';
import { CalendarRangeExample } from '../../../libs/spartan-examples/components/(calendar)/calendar--range.example';
import { CalendarYearAndMonthExample } from '../../../libs/spartan-examples/components/(calendar)/calendar--year-and-month.example';

// Date Picker variants
import { DatePickerRangeExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--range.example';
import { DatePickerMultipleExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--multi.example';
import { DatePickerFormatExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--format.example';
import { DatePickerConfigExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--config.example';
import { DateAndTimePickerExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--date-time.example';
import { DatePickerFormExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--form.example';
import { DatePickerFormRangeExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--form-range.example';
import { DatePickerFormMultipleExample } from '../../../libs/spartan-examples/components/(date-picker)/date-picker--form-multi.example';

// Input OTP variants
import { InputOtpFormExample } from '../../../libs/spartan-examples/components/(input-otp)/input-otp--form.example';

// Radio Group variants
import { RadioGroupCard } from '../../../libs/spartan-examples/components/(radio-group)/radio-group--card.example';
import { RadioGroupFormPreview } from '../../../libs/spartan-examples/components/(radio-group)/radio-group--form.example';

// Breadcrumb variants - excluded due to missing @spartan-ng/helm/menu dependency
// import { BreadcrumbDropdown } from '../../../libs/spartan-examples/components/(breadcrumb)/breadcrumb--dropdown.example';
// import { BreadcrumbCustomSeparator } from '../../../libs/spartan-examples/components/(breadcrumb)/breadcrumb--custom-separator.example';
// import { BreadcrumbCollapsed } from '../../../libs/spartan-examples/components/(breadcrumb)/breadcrumb--collapsed.example';

interface VariantItem {
  id: string;
  title: string;
}

interface ComponentItem {
  id: string;
  title: string;
  preview: Type<unknown>;
  variants?: VariantItem[];
}

interface ComponentCategory {
  id: string;
  title: string;
  icon: string;
  expanded: boolean;
  items: ComponentItem[];
}

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmSidebarImports,
    CodeBlockComponent,
  ],
  viewProviders: [
    provideIcons({
      lucideChevronDown,
      lucideChevronRight,
      lucideCode,
      lucideEye,
      lucideBox,
      lucideLayoutGrid,
      lucideType,
      lucideToggleLeft,
      lucideCalendar,
      lucideTable,
      lucideNavigation,
      lucideMessageSquare,
      lucideMoreHorizontal,
    }),
  ],
  template: `
    <div hlmSidebarWrapper class="min-h-[calc(100vh-8rem)]">
      <!-- Sidebar -->
      <hlm-sidebar collapsible="none" class="border-r">
        <div hlmSidebarHeader class="p-4">
          <h2 class="text-lg font-semibold">Components</h2>
          <p class="text-sm text-muted-foreground">UI building blocks</p>
        </div>
        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (category of categories; track category.id) {
                  <li hlmSidebarMenuItem>
                    <!-- Category Header -->
                    <button
                      hlmSidebarMenuButton
                      class="justify-between"
                      (click)="toggleCategory(category.id)"
                    >
                      <span class="flex items-center gap-2">
                        <ng-icon hlm [name]="category.icon" size="sm" />
                        {{ category.title }}
                      </span>
                      <ng-icon
                        hlm
                        [name]="category.expanded ? 'lucideChevronDown' : 'lucideChevronRight'"
                        size="sm"
                        class="text-muted-foreground"
                      />
                    </button>
                    <!-- Category Items -->
                    @if (category.expanded) {
                      <ul class="ml-4 mt-1 space-y-1 border-l pl-4">
                        @for (item of category.items; track item.id) {
                          <li>
                            <button
                              class="w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors"
                              [class]="activeComponent() === item.id
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
                              (click)="selectComponent(item.id)"
                            >
                              {{ item.title }}
                            </button>
                          </li>
                        }
                      </ul>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </hlm-sidebar>

      <!-- Main Content -->
      <main hlmSidebarInset class="flex flex-col h-[calc(100vh-8rem)]">
        <!-- Header Bar -->
        <div class="flex items-center justify-between px-6 py-3 border-b bg-muted/30">
          <div>
            <h2 class="text-lg font-semibold">{{ currentComponentTitle() }}</h2>
            <p class="text-sm text-muted-foreground">{{ activeComponent() }}</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex rounded-lg border p-1">
              <button
                hlmBtn
                [variant]="showCode() ? 'ghost' : 'secondary'"
                size="sm"
                (click)="showCode.set(false)"
              >
                <ng-icon hlm name="lucideEye" size="sm" class="mr-1" />
                Preview
              </button>
              <button
                hlmBtn
                [variant]="showCode() ? 'secondary' : 'ghost'"
                size="sm"
                (click)="showCode.set(true)"
              >
                <ng-icon hlm name="lucideCode" size="sm" class="mr-1" />
                Code
              </button>
            </div>
          </div>
        </div>

        <!-- Variants Tabs (if component has variants) -->
        @if (currentComponentVariants().length > 0) {
          <div class="border-b px-6">
            <div class="flex gap-1 -mb-px overflow-x-auto">
              <button
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
                [class]="!activeVariant()
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'"
                (click)="selectVariant(null)"
              >
                Default
              </button>
              @for (variant of currentComponentVariants(); track variant.id) {
                <button
                  class="px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
                  [class]="activeVariant() === variant.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'"
                  (click)="selectVariant(variant.id)"
                >
                  {{ variant.title }}
                </button>
              }
            </div>
          </div>
        }

        <!-- Preview or Code -->
        <div class="flex-1 overflow-auto" [class]="showCode() ? '' : 'bg-muted/20 p-6'">
          @if (showCode()) {
            <app-code-block [code]="currentSourceCode()" class="block h-full" />
          } @else {
            <div class="flex items-center justify-center min-h-[400px]">
              <ng-container *ngComponentOutlet="currentPreviewComponent()" />
            </div>
          }
        </div>
      </main>
    </div>
  `,
})
export class ComponentsComponent {
  activeComponent = signal('button');
  activeVariant = signal<string | null>(null);
  showCode = signal(false);

  // Map component IDs to their preview components (including variants)
  previewComponents: Record<string, Type<unknown>> = {
    // Main components
    'accordion': AccordionPreview,
    'alert': AlertPreview,
    'alert-dialog': AlertDialogPreview,
    'aspect-ratio': AspectRatioPreview,
    'autocomplete': AutocompletePreview,
    'avatar': AvatarPreview,
    'badge': BadgePreview,
    'button': ButtonPreview,
    'calendar': CalendarPreview,
    'card': CardPreview,
    'carousel': CarouselPreview,
    'checkbox': CheckboxPreview,
    'collapsible': CollapsiblePreview,
    'combobox': ComboboxPreview,
    'command': CommandPreview,
    'date-picker': DatePickerPreview,
    'empty': EmptyPreview,
    'field': FieldPreview,
    'form-field': FormFieldPreview,
    'hover-card': HoverCardPreview,
    'icon': IconPreview,
    'input': InputPreview,
    'input-otp': InputOtpPreview,
    'kbd': KbdPreview,
    'label': LabelPreview,
    'navigation-menu': NavigationMenuPreview,
    'pagination': PaginationPreview,
    'popover': PopoverPreview,
    'progress': ProgressPreview,
    'radio-group': RadioGroupPreview,
    'resizable': ResizablePreviewComponent,
    'select': SelectPreview,
    'separator': SeparatorPreview,
    'sheet': SheetPreview,
    'skeleton': SkeletonPreview,
    'slider': SliderPreview,
    'sonner': SonnerPreview,
    'spinner': SpinnerPreview,
    'switch': SwitchPreview,
    'table': TablePreview,
    'tabs': TabsPreview,
    'textarea': TextareaPreview,
    'toggle': TogglePreview,
    'toggle-group': ToggleGroupPreview,
    'tooltip': TooltipPreview,

    // Button variants
    'button--secondary': ButtonSecondary,
    'button--destructive': ButtonDestructive,
    'button--outline': ButtonOutline,
    'button--ghost': ButtonGhost,
    'button--link': ButtonLink,
    'button--icon': ButtonIcon,
    'button--with-icon': ButtonWithIcon,
    'button--spinner': ButtonSpinner,
    'button--anchor': ButtonAnchor,

    // Accordion variants
    'accordion--multiple-opened': AccordionMultipleOpened,

    // Alert variants
    'alert--destructive': AlertDestructive,

    // Badge variants
    'badge--link': BadgeLink,

    // Carousel variants
    'carousel--orientation': CarouselOrientation,
    'carousel--sizes': CarouselSizes,
    'carousel--spacing': CarouselSpacing,
    'carousel--slide-count': CarouselSlideCount,
    'carousel--plugins': CarouselPlugins,

    // Icon variants
    'icon--size': IconSizePreview,
    'icon--multiple': IconMultipleSetsPreview,
    'icon--responsive': IconResponsivePreview,

    // Tooltip variants
    'tooltip--simple': TooltipSimple,

    // Command variants
    'command--dialog': CommandDialog,

    // Navigation Menu variants
    'navigation-menu--vertical': NavigationMenuVertical,
    'navigation-menu--nested': NavigationMenuNested,
    'navigation-menu--controlled': NavigationMenuControlled,

    // Pagination variants
    'pagination--icon-only': PaginationIconOnly,
    'pagination--advanced': PaginationAdvanced,
    'pagination--query-params': PaginationQueryParams,
    'pagination--advanced-query': PaginationAdvancedQuery,

    // Autocomplete variants
    // 'autocomplete--async': AutocompleteAsync, // excluded - resource API issue
    'autocomplete--config': AutocompleteConfig,
    'autocomplete--countries': AutocompleteCountries,
    'autocomplete--form': AutocompleteForm,
    'autocomplete--transform-option-value': AutocompleteTransformOptionValue,

    // Calendar variants
    'calendar--multiple': CalendarMultipleExample,
    'calendar--range': CalendarRangeExample,
    'calendar--year-and-month': CalendarYearAndMonthExample,

    // Date Picker variants
    'date-picker--range': DatePickerRangeExample,
    'date-picker--multi': DatePickerMultipleExample,
    'date-picker--format': DatePickerFormatExample,
    'date-picker--config': DatePickerConfigExample,
    'date-picker--date-time': DateAndTimePickerExample,
    'date-picker--form': DatePickerFormExample,
    'date-picker--form-range': DatePickerFormRangeExample,
    'date-picker--form-multi': DatePickerFormMultipleExample,

    // Input OTP variants
    'input-otp--form': InputOtpFormExample,

    // Radio Group variants
    'radio-group--card': RadioGroupCard,
    'radio-group--form': RadioGroupFormPreview,
  };

  categories: ComponentCategory[] = [
    {
      id: 'inputs',
      title: 'Inputs',
      icon: 'lucideType',
      expanded: true,
      items: [
        { id: 'button', title: 'Button', preview: ButtonPreview, variants: [
          { id: 'button--secondary', title: 'Secondary' },
          { id: 'button--destructive', title: 'Destructive' },
          { id: 'button--outline', title: 'Outline' },
          { id: 'button--ghost', title: 'Ghost' },
          { id: 'button--link', title: 'Link' },
          { id: 'button--icon', title: 'Icon' },
          { id: 'button--with-icon', title: 'With Icon' },
          { id: 'button--spinner', title: 'Spinner' },
          { id: 'button--anchor', title: 'As Anchor' },
        ]},
        { id: 'checkbox', title: 'Checkbox', preview: CheckboxPreview },
        { id: 'input', title: 'Input', preview: InputPreview },
        { id: 'input-otp', title: 'Input OTP', preview: InputOtpPreview, variants: [
          { id: 'input-otp--form', title: 'With Form' },
        ]},
        { id: 'label', title: 'Label', preview: LabelPreview },
        { id: 'radio-group', title: 'Radio Group', preview: RadioGroupPreview, variants: [
          { id: 'radio-group--card', title: 'Card Style' },
          { id: 'radio-group--form', title: 'With Form' },
        ]},
        { id: 'select', title: 'Select', preview: SelectPreview },
        { id: 'slider', title: 'Slider', preview: SliderPreview },
        { id: 'switch', title: 'Switch', preview: SwitchPreview },
        { id: 'textarea', title: 'Textarea', preview: TextareaPreview },
        { id: 'toggle', title: 'Toggle', preview: TogglePreview },
        { id: 'toggle-group', title: 'Toggle Group', preview: ToggleGroupPreview },
      ],
    },
    {
      id: 'data-display',
      title: 'Data Display',
      icon: 'lucideLayoutGrid',
      expanded: false,
      items: [
        { id: 'accordion', title: 'Accordion', preview: AccordionPreview, variants: [
          { id: 'accordion--multiple-opened', title: 'Multiple Opened' },
        ]},
        { id: 'avatar', title: 'Avatar', preview: AvatarPreview },
        { id: 'badge', title: 'Badge', preview: BadgePreview, variants: [
          { id: 'badge--link', title: 'As Link' },
        ]},
        { id: 'card', title: 'Card', preview: CardPreview },
        { id: 'carousel', title: 'Carousel', preview: CarouselPreview, variants: [
          { id: 'carousel--orientation', title: 'Orientation' },
          { id: 'carousel--sizes', title: 'Sizes' },
          { id: 'carousel--spacing', title: 'Spacing' },
          { id: 'carousel--slide-count', title: 'Slide Count' },
          { id: 'carousel--plugins', title: 'Plugins' },
        ]},
        { id: 'collapsible', title: 'Collapsible', preview: CollapsiblePreview },
        { id: 'empty', title: 'Empty', preview: EmptyPreview },
        { id: 'icon', title: 'Icon', preview: IconPreview, variants: [
          { id: 'icon--size', title: 'Sizes' },
          { id: 'icon--multiple', title: 'Multiple' },
          { id: 'icon--responsive', title: 'Responsive' },
        ]},
        { id: 'progress', title: 'Progress', preview: ProgressPreview },
        { id: 'separator', title: 'Separator', preview: SeparatorPreview },
        { id: 'skeleton', title: 'Skeleton', preview: SkeletonPreview },
        { id: 'spinner', title: 'Spinner', preview: SpinnerPreview },
        { id: 'table', title: 'Table', preview: TablePreview },
        { id: 'tabs', title: 'Tabs', preview: TabsPreview },
      ],
    },
    {
      id: 'feedback',
      title: 'Feedback',
      icon: 'lucideMessageSquare',
      expanded: false,
      items: [
        { id: 'alert', title: 'Alert', preview: AlertPreview, variants: [
          { id: 'alert--destructive', title: 'Destructive' },
        ]},
        { id: 'alert-dialog', title: 'Alert Dialog', preview: AlertDialogPreview },
        { id: 'sonner', title: 'Sonner (Toast)', preview: SonnerPreview },
        { id: 'tooltip', title: 'Tooltip', preview: TooltipPreview, variants: [
          { id: 'tooltip--simple', title: 'Simple' },
        ]},
      ],
    },
    {
      id: 'overlays',
      title: 'Overlays',
      icon: 'lucideBox',
      expanded: false,
      items: [
        { id: 'hover-card', title: 'Hover Card', preview: HoverCardPreview },
        { id: 'popover', title: 'Popover', preview: PopoverPreview },
        { id: 'sheet', title: 'Sheet', preview: SheetPreview },
      ],
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: 'lucideNavigation',
      expanded: false,
      items: [
        { id: 'command', title: 'Command', preview: CommandPreview, variants: [
          { id: 'command--dialog', title: 'Dialog' },
        ]},
        { id: 'navigation-menu', title: 'Navigation Menu', preview: NavigationMenuPreview, variants: [
          { id: 'navigation-menu--vertical', title: 'Vertical' },
          { id: 'navigation-menu--nested', title: 'Nested' },
          { id: 'navigation-menu--controlled', title: 'Controlled' },
        ]},
        { id: 'pagination', title: 'Pagination', preview: PaginationPreview, variants: [
          { id: 'pagination--icon-only', title: 'Icon Only' },
          { id: 'pagination--advanced', title: 'Advanced' },
          { id: 'pagination--query-params', title: 'Query Params' },
          { id: 'pagination--advanced-query', title: 'Advanced Query' },
        ]},
      ],
    },
    {
      id: 'pickers',
      title: 'Pickers',
      icon: 'lucideCalendar',
      expanded: false,
      items: [
        { id: 'autocomplete', title: 'Autocomplete', preview: AutocompletePreview, variants: [
          // { id: 'autocomplete--async', title: 'Async' }, // excluded - resource API issue
          { id: 'autocomplete--config', title: 'Config' },
          { id: 'autocomplete--countries', title: 'Countries' },
          { id: 'autocomplete--form', title: 'With Form' },
          { id: 'autocomplete--transform-option-value', title: 'Transform Value' },
        ]},
        { id: 'calendar', title: 'Calendar', preview: CalendarPreview, variants: [
          { id: 'calendar--multiple', title: 'Multiple' },
          { id: 'calendar--range', title: 'Range' },
          { id: 'calendar--year-and-month', title: 'Year & Month' },
        ]},
        { id: 'combobox', title: 'Combobox', preview: ComboboxPreview },
        { id: 'date-picker', title: 'Date Picker', preview: DatePickerPreview, variants: [
          { id: 'date-picker--range', title: 'Range' },
          { id: 'date-picker--multi', title: 'Multiple' },
          { id: 'date-picker--format', title: 'Format' },
          { id: 'date-picker--config', title: 'Config' },
          { id: 'date-picker--date-time', title: 'Date Time' },
          { id: 'date-picker--form', title: 'With Form' },
          { id: 'date-picker--form-range', title: 'Form Range' },
          { id: 'date-picker--form-multi', title: 'Form Multi' },
        ]},
      ],
    },
    {
      id: 'forms',
      title: 'Forms',
      icon: 'lucideToggleLeft',
      expanded: false,
      items: [
        { id: 'field', title: 'Field', preview: FieldPreview },
        { id: 'form-field', title: 'Form Field', preview: FormFieldPreview },
      ],
    },
    {
      id: 'layout',
      title: 'Layout',
      icon: 'lucideTable',
      expanded: false,
      items: [
        { id: 'aspect-ratio', title: 'Aspect Ratio', preview: AspectRatioPreview },
        { id: 'resizable', title: 'Resizable', preview: ResizablePreviewComponent },
      ],
    },
    {
      id: 'misc',
      title: 'Miscellaneous',
      icon: 'lucideMoreHorizontal',
      expanded: false,
      items: [
        { id: 'kbd', title: 'Kbd', preview: KbdPreview },
      ],
    },
  ];

  currentComponentTitle = computed(() => {
    for (const category of this.categories) {
      const item = category.items.find(i => i.id === this.activeComponent());
      if (item) return item.title;
    }
    return '';
  });

  currentComponentVariants = computed(() => {
    for (const category of this.categories) {
      const item = category.items.find(i => i.id === this.activeComponent());
      if (item?.variants) return item.variants;
    }
    return [];
  });

  currentSourceCode = computed(() => {
    const id = this.activeVariant() || this.activeComponent();
    return componentSourceMap[id] || '// Source code not available';
  });

  currentPreviewComponent = computed(() => {
    // Use variant preview if available, otherwise fall back to main component
    const variantId = this.activeVariant();
    if (variantId && this.previewComponents[variantId]) {
      return this.previewComponents[variantId];
    }
    return this.previewComponents[this.activeComponent()] || ButtonPreview;
  });

  toggleCategory(categoryId: string) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.expanded = !category.expanded;
    }
  }

  selectComponent(componentId: string) {
    this.activeComponent.set(componentId);
    this.activeVariant.set(null);
  }

  selectVariant(variantId: string | null) {
    this.activeVariant.set(variantId);
  }
}
