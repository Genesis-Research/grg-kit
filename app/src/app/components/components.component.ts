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

interface ComponentItem {
  id: string;
  title: string;
  preview: Type<unknown>;
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
            <p class="text-sm text-muted-foreground">{{ currentComponentId() }}</p>
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
  showCode = signal(false);

  // Map component IDs to their preview components
  previewComponents: Record<string, Type<unknown>> = {
    'accordion': AccordionPreview,
    'alert': AlertPreview,
    'alert-dialog': AlertDialogPreview,
    'aspect-ratio': AspectRatioPreview,
    'autocomplete': AutocompletePreview,
    'avatar': AvatarPreview,
    'badge': BadgePreview,
    // 'breadcrumb': BreadcrumbPreview, // excluded
    'button': ButtonPreview,
    // 'button-group': ButtonGroupPreview, // excluded
    'calendar': CalendarPreview,
    'card': CardPreview,
    'carousel': CarouselPreview,
    'checkbox': CheckboxPreview,
    'collapsible': CollapsiblePreview,
    'combobox': ComboboxPreview,
    'command': CommandPreview,
    // 'context-menu': ContextMenuPreview, // excluded
    // 'data-table': DataTablePreview, // excluded
    'date-picker': DatePickerPreview,
    // 'dialog': DialogPreview, // excluded
    // 'dropdown-menu': DropdownPreview, // excluded
    'empty': EmptyPreview,
    'field': FieldPreview,
    'form-field': FormFieldPreview,
    'hover-card': HoverCardPreview,
    'icon': IconPreview,
    'input': InputPreview,
    // 'input-group': InputGroupPreview, // excluded
    'input-otp': InputOtpPreview,
    // 'item': ItemPreview, // excluded
    'kbd': KbdPreview,
    'label': LabelPreview,
    // 'menubar': MenubarPreview, // excluded - missing dependencies
    'navigation-menu': NavigationMenuPreview,
    'pagination': PaginationPreview,
    'popover': PopoverPreview,
    'progress': ProgressPreview,
    'radio-group': RadioGroupPreview,
    'resizable': ResizablePreviewComponent,
    // 'scroll-area': ScrollAreaPreview, // excluded - missing ngx-scrollbar
    'select': SelectPreview,
    'separator': SeparatorPreview,
    'sheet': SheetPreview,
    // 'sidebar': SidebarPreviewComponent, // excluded
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
  };

  categories: ComponentCategory[] = [
    {
      id: 'inputs',
      title: 'Inputs',
      icon: 'lucideType',
      expanded: true,
      items: [
        { id: 'button', title: 'Button', preview: ButtonPreview },
        // { id: 'button-group', title: 'Button Group', preview: ButtonGroupPreview }, // excluded
        { id: 'checkbox', title: 'Checkbox', preview: CheckboxPreview },
        { id: 'input', title: 'Input', preview: InputPreview },
        // { id: 'input-group', title: 'Input Group', preview: InputGroupPreview }, // excluded
        { id: 'input-otp', title: 'Input OTP', preview: InputOtpPreview },
        { id: 'label', title: 'Label', preview: LabelPreview },
        { id: 'radio-group', title: 'Radio Group', preview: RadioGroupPreview },
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
        { id: 'accordion', title: 'Accordion', preview: AccordionPreview },
        { id: 'avatar', title: 'Avatar', preview: AvatarPreview },
        { id: 'badge', title: 'Badge', preview: BadgePreview },
        { id: 'card', title: 'Card', preview: CardPreview },
        { id: 'carousel', title: 'Carousel', preview: CarouselPreview },
        { id: 'collapsible', title: 'Collapsible', preview: CollapsiblePreview },
        // { id: 'data-table', title: 'Data Table', preview: DataTablePreview }, // excluded
        { id: 'empty', title: 'Empty', preview: EmptyPreview },
        { id: 'icon', title: 'Icon', preview: IconPreview },
        { id: 'progress', title: 'Progress', preview: ProgressPreview },
        // { id: 'scroll-area', title: 'Scroll Area', preview: ScrollAreaPreview }, // excluded
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
        { id: 'alert', title: 'Alert', preview: AlertPreview },
        { id: 'alert-dialog', title: 'Alert Dialog', preview: AlertDialogPreview },
        { id: 'sonner', title: 'Sonner (Toast)', preview: SonnerPreview },
        { id: 'tooltip', title: 'Tooltip', preview: TooltipPreview },
      ],
    },
    {
      id: 'overlays',
      title: 'Overlays',
      icon: 'lucideBox',
      expanded: false,
      items: [
        // { id: 'dialog', title: 'Dialog', preview: DialogPreview }, // excluded
        // { id: 'dropdown-menu', title: 'Dropdown Menu', preview: DropdownPreview }, // excluded
        { id: 'hover-card', title: 'Hover Card', preview: HoverCardPreview },
        { id: 'popover', title: 'Popover', preview: PopoverPreview },
        { id: 'sheet', title: 'Sheet', preview: SheetPreview },
        // { id: 'context-menu', title: 'Context Menu', preview: ContextMenuPreview }, // excluded
      ],
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: 'lucideNavigation',
      expanded: false,
      items: [
        // { id: 'breadcrumb', title: 'Breadcrumb', preview: BreadcrumbPreview }, // excluded
        { id: 'command', title: 'Command', preview: CommandPreview },
        // { id: 'menubar', title: 'Menubar', preview: MenubarPreview }, // excluded
        { id: 'navigation-menu', title: 'Navigation Menu', preview: NavigationMenuPreview },
        { id: 'pagination', title: 'Pagination', preview: PaginationPreview },
        // { id: 'sidebar', title: 'Sidebar', preview: SidebarPreviewComponent }, // excluded
      ],
    },
    {
      id: 'pickers',
      title: 'Pickers',
      icon: 'lucideCalendar',
      expanded: false,
      items: [
        { id: 'autocomplete', title: 'Autocomplete', preview: AutocompletePreview },
        { id: 'calendar', title: 'Calendar', preview: CalendarPreview },
        { id: 'combobox', title: 'Combobox', preview: ComboboxPreview },
        { id: 'date-picker', title: 'Date Picker', preview: DatePickerPreview },
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
        // { id: 'item', title: 'Item', preview: ItemPreview }, // excluded
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

  currentComponentId = computed(() => this.activeComponent());

  currentSourceCode = computed(() => {
    return componentSourceMap[this.activeComponent()] || '// Source code not available';
  });

  currentPreviewComponent = computed(() => {
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
  }
}
