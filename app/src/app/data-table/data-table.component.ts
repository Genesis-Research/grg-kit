import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpDown, lucideChevronDown, lucideChevronUp, lucideSearch, lucideSettings2, lucideTrash2, lucidePencil, lucideEye } from '@ng-icons/lucide';
import { BrnAlertDialogImports } from '@spartan-ng/brain/alert-dialog';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgIcon,
    HlmIcon,
    HlmButtonImports,
    HlmCardImports,
    HlmCheckboxImports,
    HlmInputImports,
    HlmBadgeImports,
    HlmTableImports,
    HlmPopoverImports,
    BrnPopoverImports,
    HlmAlertDialogImports,
    BrnAlertDialogImports,
    FlexRenderDirective,
  ],
  viewProviders: [provideIcons({ lucideArrowUpDown, lucideChevronDown, lucideChevronUp, lucideSearch, lucideSettings2, lucideTrash2, lucidePencil, lucideEye })],
  host: {
    class: 'block w-full max-w-4xl mx-auto',
  },
  template: `
    <h2 class="text-2xl font-bold mb-6">Data Table Examples</h2>

    <!-- Basic Table -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Basic Table</h3>
        <p hlmCardDescription>A simple table displaying data without any interactive features</p>
      </div>
      <div hlmCardContent>
        <div class="overflow-hidden rounded-md border">
          <div hlmTableContainer>
            <table hlmTable>
              <thead hlmTHead>
                <tr hlmTr>
                  <th hlmTh>Name</th>
                  <th hlmTh>Email</th>
                  <th hlmTh>Role</th>
                  <th hlmTh class="text-right">Salary</th>
                </tr>
              </thead>
              <tbody hlmTBody>
                @for (user of basicUsers; track user.id) {
                  <tr hlmTr>
                    <td hlmTd class="font-medium">{{ user.name }}</td>
                    <td hlmTd>{{ user.email }}</td>
                    <td hlmTd>{{ user.role }}</td>
                    <td hlmTd class="text-right">{{ user.salary | currency }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Table with Sorting -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Sortable Table</h3>
        <p hlmCardDescription>Click on column headers to sort data ascending or descending</p>
      </div>
      <div hlmCardContent>
        <div class="overflow-hidden rounded-md border">
          @defer {
            <div hlmTableContainer>
              <table hlmTable>
                <thead hlmTHead>
                  @for (headerGroup of sortableTable.getHeaderGroups(); track headerGroup.id) {
                    <tr hlmTr>
                      @for (header of headerGroup.headers; track header.id) {
                        <th hlmTh [attr.colSpan]="header.colSpan">
                          @if (!header.isPlaceholder) {
                            <ng-container
                              *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
                            >
                              @if (header.column.getCanSort()) {
                                <button
                                  hlmBtn
                                  size="sm"
                                  variant="ghost"
                                  (click)="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                                >
                                  {{ headerText }}
                                  @if (header.column.getIsSorted() === 'asc') {
                                    <ng-icon hlm size="sm" name="lucideChevronUp" />
                                  } @else if (header.column.getIsSorted() === 'desc') {
                                    <ng-icon hlm size="sm" name="lucideChevronDown" />
                                  } @else {
                                    <ng-icon hlm size="sm" name="lucideArrowUpDown" />
                                  }
                                </button>
                              } @else {
                                <div [innerHTML]="headerText"></div>
                              }
                            </ng-container>
                          }
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody hlmTBody>
                  @for (row of sortableTable.getRowModel().rows; track row.id) {
                    <tr hlmTr>
                      @for (cell of row.getVisibleCells(); track $index) {
                        <td hlmTd>
                          <ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
                            <div [innerHTML]="cell"></div>
                          </ng-container>
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Table with Filtering -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Filterable Table</h3>
        <p hlmCardDescription>Search and filter table data in real-time</p>
      </div>
      <div hlmCardContent>
        <div class="flex items-center gap-2 pb-4">
          <ng-icon hlm name="lucideSearch" size="sm" class="text-muted-foreground" />
          <input
            hlmInput
            class="w-full md:w-80"
            placeholder="Search by name or email..."
            [ngModel]="globalFilter()"
            (ngModelChange)="filterGlobally($event)"
          />
        </div>
        <div class="overflow-hidden rounded-md border">
          @defer {
            <div hlmTableContainer>
              <table hlmTable>
                <thead hlmTHead>
                  @for (headerGroup of filterableTable.getHeaderGroups(); track headerGroup.id) {
                    <tr hlmTr>
                      @for (header of headerGroup.headers; track header.id) {
                        <th hlmTh>
                          @if (!header.isPlaceholder) {
                            <ng-container
                              *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
                            >
                              {{ headerText }}
                            </ng-container>
                          }
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody hlmTBody>
                  @for (row of filterableTable.getRowModel().rows; track row.id) {
                    <tr hlmTr>
                      @for (cell of row.getVisibleCells(); track $index) {
                        <td hlmTd>
                          <ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
                            <div [innerHTML]="cell"></div>
                          </ng-container>
                        </td>
                      }
                    </tr>
                  } @empty {
                    <tr hlmTr>
                      <td hlmTd class="h-24 text-center" colspan="4">No results found.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Table with Row Selection -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Selectable Table</h3>
        <p hlmCardDescription>Select individual rows or all rows at once</p>
      </div>
      <div hlmCardContent>
        <div class="overflow-hidden rounded-md border">
          @defer {
            <div hlmTableContainer>
              <table hlmTable>
                <thead hlmTHead>
                  @for (headerGroup of selectableTable.getHeaderGroups(); track headerGroup.id) {
                    <tr hlmTr>
                      @for (header of headerGroup.headers; track header.id) {
                        <th hlmTh>
                          @if (!header.isPlaceholder) {
                            @if (header.id === 'select') {
                              <hlm-checkbox
                                [checked]="selectableTable.getIsAllRowsSelected()"
                                [indeterminate]="selectableTable.getIsSomeRowsSelected()"
                                (checkedChange)="selectableTable.toggleAllRowsSelected()"
                              />
                            } @else {
                              <ng-container
                                *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
                              >
                                {{ headerText }}
                              </ng-container>
                            }
                          }
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody hlmTBody>
                  @for (row of selectableTable.getRowModel().rows; track row.id) {
                    <tr hlmTr [attr.data-state]="row.getIsSelected() && 'selected'">
                      @for (cell of row.getVisibleCells(); track $index) {
                        <td hlmTd>
                          @if (cell.column.id === 'select') {
                            <hlm-checkbox
                              [checked]="row.getIsSelected()"
                              (checkedChange)="row.getToggleSelectedHandler()($event)"
                            />
                          } @else {
                            <ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
                              <div [innerHTML]="cell"></div>
                            </ng-container>
                          }
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
        <div class="py-4 text-sm text-muted-foreground">
          {{ selectableTable.getSelectedRowModel().rows.length }} of {{ selectableTable.getRowCount() }} row(s) selected
        </div>
      </div>
    </section>

    <!-- Table with Column Visibility -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Column Visibility</h3>
        <p hlmCardDescription>Toggle columns on/off with a dropdown menu. This table has many columns that overflow horizontally.</p>
      </div>
      <div hlmCardContent>
        <!-- Toolbar -->
        <div class="flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
          <input
            hlmInput
            class="w-full md:w-80"
            placeholder="Search employees..."
            [ngModel]="employeeFilter()"
            (ngModelChange)="filterEmployees($event)"
          />
          <brn-popover sideOffset="5">
            <button hlmBtn variant="outline" brnPopoverTrigger>
              <ng-icon hlm size="sm" name="lucideSettings2" />
              Columns
              <ng-icon hlm size="sm" name="lucideChevronDown" />
            </button>
            <div hlmPopoverContent class="w-48 p-2" *brnPopoverContent="let ctx">
              <div class="text-sm font-medium pb-2 border-b mb-2">Toggle columns</div>
              @for (column of columnVisibilityTable.getAllColumns(); track column.id) {
                @if (column.getCanHide()) {
                  <div class="flex items-center gap-2 py-1">
                    <hlm-checkbox
                      [id]="'col-' + column.id"
                      [checked]="column.getIsVisible()"
                      (checkedChange)="column.toggleVisibility()"
                    />
                    <label [for]="'col-' + column.id" class="text-sm capitalize cursor-pointer">{{ column.id }}</label>
                  </div>
                }
              }
            </div>
          </brn-popover>
        </div>

        <!-- Table with horizontal scroll -->
        <div class="overflow-hidden rounded-md border">
          @defer {
            <div hlmTableContainer class="max-h-[400px]">
              <table hlmTable>
                <thead hlmTHead>
                  @for (headerGroup of columnVisibilityTable.getHeaderGroups(); track headerGroup.id) {
                    <tr hlmTr>
                      @for (header of headerGroup.headers; track header.id) {
                        <th hlmTh class="whitespace-nowrap" [attr.colSpan]="header.colSpan">
                          @if (!header.isPlaceholder) {
                            <ng-container
                              *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
                            >
                              @if (header.column.getCanSort()) {
                                <button
                                  hlmBtn
                                  size="sm"
                                  variant="ghost"
                                  (click)="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                                >
                                  {{ headerText }}
                                  @if (header.column.getIsSorted() === 'asc') {
                                    <ng-icon hlm size="sm" name="lucideChevronUp" />
                                  } @else if (header.column.getIsSorted() === 'desc') {
                                    <ng-icon hlm size="sm" name="lucideChevronDown" />
                                  } @else {
                                    <ng-icon hlm size="sm" name="lucideArrowUpDown" />
                                  }
                                </button>
                              } @else {
                                {{ headerText }}
                              }
                            </ng-container>
                          }
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody hlmTBody>
                  @for (row of columnVisibilityTable.getRowModel().rows; track row.id) {
                    <tr hlmTr>
                      @for (cell of row.getVisibleCells(); track $index) {
                        <td hlmTd class="whitespace-nowrap">
                          <ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
                            <div [innerHTML]="cell"></div>
                          </ng-container>
                        </td>
                      }
                    </tr>
                  } @empty {
                    <tr hlmTr>
                      <td hlmTd class="h-24 text-center" [attr.colspan]="employeeColumns.length">No results.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
          <div class="text-sm text-muted-foreground">
            Showing {{ columnVisibilityTable.getRowModel().rows.length }} of {{ columnVisibilityTable.getRowCount() }} row(s)
          </div>
          <div class="mt-2 flex space-x-2 sm:mt-0">
            <button
              size="sm"
              variant="outline"
              hlmBtn
              [disabled]="!columnVisibilityTable.getCanPreviousPage()"
              (click)="columnVisibilityTable.previousPage()"
            >
              Previous
            </button>
            <button
              size="sm"
              variant="outline"
              hlmBtn
              [disabled]="!columnVisibilityTable.getCanNextPage()"
              (click)="columnVisibilityTable.nextPage()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Table with Custom Actions -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Custom Actions</h3>
        <p hlmCardDescription>Table with custom action buttons that trigger dialogs</p>
      </div>
      <div hlmCardContent>
        <div class="overflow-hidden rounded-md border">
          <table hlmTable>
            <thead hlmTHead>
              <tr hlmTr>
                <th hlmTh>Name</th>
                <th hlmTh>Email</th>
                <th hlmTh>Role</th>
                <th hlmTh>Status</th>
                <th hlmTh class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody hlmTBody>
              @for (item of actionTableData(); track item.id) {
                <tr hlmTr>
                  <td hlmTd class="font-medium">{{ item.name }}</td>
                  <td hlmTd class="text-muted-foreground">{{ item.email }}</td>
                  <td hlmTd>{{ item.role }}</td>
                  <td hlmTd>
                    <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      [class.bg-primary]="item.status === 'Active'"
                      [class.text-primary-foreground]="item.status === 'Active'"
                      [class.bg-secondary]="item.status === 'Inactive'"
                      [class.text-secondary-foreground]="item.status === 'Inactive'">
                      {{ item.status }}
                    </span>
                  </td>
                  <td hlmTd>
                    <div class="flex justify-end gap-1">
                      <!-- View Button -->
                      <button hlmBtn variant="ghost" size="icon" class="h-8 w-8" (click)="viewItem(item)">
                        <ng-icon hlm size="sm" name="lucideEye" />
                      </button>
                      <!-- Edit Button -->
                      <button hlmBtn variant="ghost" size="icon" class="h-8 w-8" (click)="editItem(item)">
                        <ng-icon hlm size="sm" name="lucidePencil" />
                      </button>
                      <!-- Delete Button with Dialog -->
                      <hlm-alert-dialog>
                        <button hlmBtn variant="ghost" size="icon" class="h-8 w-8 text-destructive hover:text-destructive" brnAlertDialogTrigger>
                          <ng-icon hlm size="sm" name="lucideTrash2" />
                        </button>
                        <hlm-alert-dialog-content *brnAlertDialogContent="let ctx">
                          <hlm-alert-dialog-header>
                            <h3 hlmAlertDialogTitle>Delete {{ item.name }}?</h3>
                            <p hlmAlertDialogDescription>
                              This action cannot be undone. This will permanently delete the user
                              <span class="font-semibold">{{ item.name }}</span> and remove their data from our servers.
                            </p>
                          </hlm-alert-dialog-header>
                          <hlm-alert-dialog-footer>
                            <button hlmAlertDialogCancel (click)="ctx.close()">Cancel</button>
                            <button hlmAlertDialogAction variant="destructive" (click)="deleteItem(item.id); ctx.close()">
                              Delete
                            </button>
                          </hlm-alert-dialog-footer>
                        </hlm-alert-dialog-content>
                      </hlm-alert-dialog>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr hlmTr>
                  <td hlmTd class="h-24 text-center" colspan="5">No users found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        @if (lastAction()) {
          <div class="mt-4 rounded-md border bg-muted/50 p-3 text-sm">
            <span class="font-medium">Last action:</span> {{ lastAction() }}
          </div>
        }
      </div>
    </section>

    <!-- Styled Table Variant -->
    <section hlmCard class="mb-8">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Styled Table</h3>
        <p hlmCardDescription>Alternative table styling with striped rows and accent colors</p>
      </div>
      <div hlmCardContent>
        <div class="overflow-hidden rounded-xl border-2 border-primary/20">
          <table class="w-full caption-bottom text-sm">
            <thead class="bg-primary text-primary-foreground">
              <tr>
                <th class="h-12 px-4 text-left font-semibold">Name</th>
                <th class="h-12 px-4 text-left font-semibold">Email</th>
                <th class="h-12 px-4 text-left font-semibold">Department</th>
                <th class="h-12 px-4 text-left font-semibold">Location</th>
                <th class="h-12 px-4 text-right font-semibold">Salary</th>
              </tr>
            </thead>
            <tbody>
              @for (user of styledTableData; track user.id; let i = $index) {
                <tr class="transition-colors hover:bg-primary/5" [class.bg-muted/50]="i % 2 === 1">
                  <td class="p-4 font-medium">{{ user.name }}</td>
                  <td class="p-4 text-muted-foreground">{{ user.email }}</td>
                  <td class="p-4">
                    <span class="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {{ user.department }}
                    </span>
                  </td>
                  <td class="p-4">{{ user.location }}</td>
                  <td class="p-4 text-right font-mono">{{ user.salary | currency }}</td>
                </tr>
              }
            </tbody>
            <tfoot class="border-t-2 border-primary/20 bg-muted/30">
              <tr>
                <td class="p-4 font-medium" colspan="4">Total Employees</td>
                <td class="p-4 text-right font-mono font-semibold">{{ styledTableData.length }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>

    <!-- Full Featured Table -->
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Full Featured Table</h3>
        <p hlmCardDescription>Complete data table with sorting, filtering, selection, and pagination</p>
      </div>
      <div hlmCardContent>
        <!-- Toolbar -->
        <div class="flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
          <input
            hlmInput
            class="w-full md:w-80"
            placeholder="Filter emails..."
            [ngModel]="emailFilter()"
            (ngModelChange)="filterByEmail($event)"
          />
        </div>

        <!-- Table -->
        <div class="overflow-hidden rounded-md border">
          @defer {
            <div hlmTableContainer>
              <table hlmTable>
                <thead hlmTHead>
                  @for (headerGroup of fullTable.getHeaderGroups(); track headerGroup.id) {
                    <tr hlmTr>
                      @for (header of headerGroup.headers; track header.id) {
                        <th hlmTh [attr.colSpan]="header.colSpan">
                          @if (!header.isPlaceholder) {
                            @if (header.id === 'select') {
                              <hlm-checkbox
                                [checked]="fullTable.getIsAllRowsSelected()"
                                [indeterminate]="fullTable.getIsSomeRowsSelected()"
                                (checkedChange)="fullTable.toggleAllRowsSelected()"
                              />
                            } @else {
                              <ng-container
                                *flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
                              >
                                @if (header.column.getCanSort()) {
                                  <button
                                    hlmBtn
                                    size="sm"
                                    variant="ghost"
                                    (click)="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                                  >
                                    {{ headerText }}
                                    @if (header.column.getIsSorted() === 'asc') {
                                      <ng-icon hlm size="sm" name="lucideChevronUp" />
                                    } @else if (header.column.getIsSorted() === 'desc') {
                                      <ng-icon hlm size="sm" name="lucideChevronDown" />
                                    } @else {
                                      <ng-icon hlm size="sm" name="lucideArrowUpDown" />
                                    }
                                  </button>
                                } @else {
                                  <div [innerHTML]="headerText"></div>
                                }
                              </ng-container>
                            }
                          }
                        </th>
                      }
                    </tr>
                  }
                </thead>
                <tbody hlmTBody>
                  @for (row of fullTable.getRowModel().rows; track row.id) {
                    <tr hlmTr [attr.data-state]="row.getIsSelected() && 'selected'">
                      @for (cell of row.getVisibleCells(); track $index) {
                        <td hlmTd>
                          @if (cell.column.id === 'select') {
                            <hlm-checkbox
                              [checked]="row.getIsSelected()"
                              (checkedChange)="row.getToggleSelectedHandler()($event)"
                            />
                          } @else {
                            <ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
                              <div [innerHTML]="cell"></div>
                            </ng-container>
                          }
                        </td>
                      }
                    </tr>
                  } @empty {
                    <tr hlmTr>
                      <td hlmTd class="h-24 text-center" [attr.colspan]="fullColumns.length">No results.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
          @if (fullTable.getRowCount() > 0) {
            <div class="text-sm text-muted-foreground">
              {{ fullTable.getSelectedRowModel().rows.length }} of {{ fullTable.getRowCount() }} row(s) selected
            </div>
            <div class="mt-2 flex space-x-2 sm:mt-0">
              <button
                size="sm"
                variant="outline"
                hlmBtn
                [disabled]="!fullTable.getCanPreviousPage()"
                (click)="fullTable.previousPage()"
              >
                Previous
              </button>
              <button
                size="sm"
                variant="outline"
                hlmBtn
                [disabled]="!fullTable.getCanNextPage()"
                (click)="fullTable.nextPage()"
              >
                Next
              </button>
            </div>
          } @else {
            <div class="flex h-full w-full items-center justify-center">
              <div class="text-muted-foreground text-sm">No Data</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class DataTableComponent {
  // Basic table data
  basicUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', salary: 85000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', salary: 75000 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', salary: 95000 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', salary: 82000 },
  ];

  // Styled table data
  styledTableData = [
    { id: 1, name: 'Emma Thompson', email: 'emma.t@company.com', department: 'Engineering', location: 'London', salary: 92000 },
    { id: 2, name: 'Liam Chen', email: 'liam.c@company.com', department: 'Design', location: 'Singapore', salary: 78000 },
    { id: 3, name: 'Olivia Patel', email: 'olivia.p@company.com', department: 'Marketing', location: 'Mumbai', salary: 68000 },
    { id: 4, name: 'Noah Kim', email: 'noah.k@company.com', department: 'Engineering', location: 'Seoul', salary: 105000 },
    { id: 5, name: 'Ava Santos', email: 'ava.s@company.com', department: 'Sales', location: 'São Paulo', salary: 72000 },
    { id: 6, name: 'William Müller', email: 'will.m@company.com', department: 'Finance', location: 'Berlin', salary: 88000 },
  ];

  // Action table with custom components
  actionTableData = signal([
    { id: 1, name: 'Alex Rivera', email: 'alex.r@company.com', role: 'Frontend Developer', status: 'Active' as const },
    { id: 2, name: 'Sam Taylor', email: 'sam.t@company.com', role: 'Backend Developer', status: 'Active' as const },
    { id: 3, name: 'Jordan Lee', email: 'jordan.l@company.com', role: 'DevOps Engineer', status: 'Inactive' as const },
    { id: 4, name: 'Casey Morgan', email: 'casey.m@company.com', role: 'Product Manager', status: 'Active' as const },
    { id: 5, name: 'Riley Chen', email: 'riley.c@company.com', role: 'UX Designer', status: 'Active' as const },
  ]);
  lastAction = signal('');

  viewItem(item: { id: number; name: string }) {
    this.lastAction.set(`Viewed "${item.name}" (ID: ${item.id})`);
  }

  editItem(item: { id: number; name: string }) {
    this.lastAction.set(`Editing "${item.name}" (ID: ${item.id})`);
  }

  deleteItem(id: number) {
    const item = this.actionTableData().find(i => i.id === id);
    this.actionTableData.update(data => data.filter(i => i.id !== id));
    this.lastAction.set(`Deleted "${item?.name}" (ID: ${id})`);
  }

  // Sortable table
  private readonly sortableSorting = signal<SortingState>([]);
  protected readonly sortableColumns: ColumnDef<Product>[] = [
    { accessorKey: 'name', header: 'Product', cell: (info) => info.getValue() },
    { accessorKey: 'category', header: 'Category', cell: (info) => info.getValue() },
    { accessorKey: 'price', header: 'Price', cell: (info) => `$${info.getValue<number>().toFixed(2)}` },
    { accessorKey: 'stock', header: 'Stock', cell: (info) => info.getValue() },
  ];
  protected readonly sortableTable = createAngularTable<Product>(() => ({
    data: PRODUCTS,
    columns: this.sortableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      updater instanceof Function ? this.sortableSorting.update(updater) : this.sortableSorting.set(updater);
    },
    state: { sorting: this.sortableSorting() },
  }));

  // Filterable table
  globalFilter = signal('');
  private readonly filterableFilters = signal<ColumnFiltersState>([]);
  protected readonly filterableColumns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Name', cell: (info) => `<span class="font-medium">${info.getValue()}</span>` },
    { accessorKey: 'email', header: 'Email', cell: (info) => info.getValue() },
    { accessorKey: 'department', header: 'Department', cell: (info) => info.getValue() },
    { accessorKey: 'location', header: 'Location', cell: (info) => info.getValue() },
  ];
  protected readonly filterableTable = createAngularTable<User>(() => ({
    data: USERS,
    columns: this.filterableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onGlobalFilterChange: (updater) => {
      updater instanceof Function ? this.globalFilter.update(updater) : this.globalFilter.set(updater);
    },
    state: { globalFilter: this.globalFilter() },
  }));

  filterGlobally(value: string) {
    this.globalFilter.set(value);
  }

  // Column visibility table (with many columns for overflow demo)
  employeeFilter = signal('');
  private readonly employeeSorting = signal<SortingState>([]);
  private readonly employeeFilters = signal<ColumnFiltersState>([]);
  private readonly employeeVisibility = signal<VisibilityState>({});

  protected readonly employeeColumns: ColumnDef<Employee>[] = [
    { accessorKey: 'id', header: 'ID', enableHiding: false, cell: (info) => info.getValue() },
    { accessorKey: 'firstName', header: 'First Name', cell: (info) => `<span class="font-medium">${info.getValue()}</span>` },
    { accessorKey: 'lastName', header: 'Last Name', cell: (info) => info.getValue() },
    { accessorKey: 'email', header: 'Email', cell: (info) => info.getValue() },
    { accessorKey: 'phone', header: 'Phone', cell: (info) => info.getValue() },
    { accessorKey: 'department', header: 'Department', cell: (info) => info.getValue() },
    { accessorKey: 'position', header: 'Position', cell: (info) => info.getValue() },
    { accessorKey: 'location', header: 'Location', cell: (info) => info.getValue() },
    { accessorKey: 'startDate', header: 'Start Date', cell: (info) => info.getValue() },
    { accessorKey: 'salary', header: 'Salary', cell: (info) => `$${info.getValue<number>().toLocaleString()}` },
    { accessorKey: 'status', header: 'Status', cell: (info) => {
      const status = info.getValue<string>();
      return `<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        status === 'Active' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }">${status}</span>`;
    }},
    { accessorKey: 'manager', header: 'Manager', cell: (info) => info.getValue() },
  ];

  protected readonly columnVisibilityTable = createAngularTable<Employee>(() => ({
    data: EMPLOYEES,
    columns: this.employeeColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => {
      updater instanceof Function ? this.employeeSorting.update(updater) : this.employeeSorting.set(updater);
    },
    onColumnFiltersChange: (updater) => {
      updater instanceof Function ? this.employeeFilters.update(updater) : this.employeeFilters.set(updater);
    },
    onColumnVisibilityChange: (updater) => {
      updater instanceof Function ? this.employeeVisibility.update(updater) : this.employeeVisibility.set(updater);
    },
    state: {
      sorting: this.employeeSorting(),
      columnFilters: this.employeeFilters(),
      columnVisibility: this.employeeVisibility(),
    },
  }));

  filterEmployees(value: string) {
    this.employeeFilter.set(value);
    this.columnVisibilityTable.setGlobalFilter(value);
  }

  // Selectable table
  private readonly selectableSelection = signal<RowSelectionState>({});
  protected readonly selectableColumns: ColumnDef<Task>[] = [
    { id: 'select', header: '', cell: () => '', enableSorting: false, enableHiding: false },
    { accessorKey: 'title', header: 'Task', cell: (info) => info.getValue() },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue<string>();
        const variant = status === 'Done' ? 'default' : status === 'In Progress' ? 'secondary' : 'outline';
        return `<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
          status === 'Done'
            ? 'bg-primary text-primary-foreground'
            : status === 'In Progress'
              ? 'bg-secondary text-secondary-foreground'
              : 'border-border'
        }">${status}</span>`;
      },
    },
    { accessorKey: 'priority', header: 'Priority', cell: (info) => info.getValue() },
  ];
  protected readonly selectableTable = createAngularTable<Task>(() => ({
    data: TASKS,
    columns: this.selectableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (updater) => {
      updater instanceof Function ? this.selectableSelection.update(updater) : this.selectableSelection.set(updater);
    },
    state: { rowSelection: this.selectableSelection() },
  }));

  // Full featured table
  emailFilter = signal('');
  private readonly fullSorting = signal<SortingState>([]);
  private readonly fullFilters = signal<ColumnFiltersState>([]);
  private readonly fullSelection = signal<RowSelectionState>({});

  protected readonly fullColumns: ColumnDef<Payment>[] = [
    { id: 'select', header: '', cell: () => '', enableSorting: false, enableHiding: false },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: (info) => {
        const status = info.getValue<string>();
        return `<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
          status === 'success'
            ? 'bg-primary text-primary-foreground'
            : status === 'processing'
              ? 'bg-secondary text-secondary-foreground'
              : status === 'failed'
                ? 'bg-destructive text-destructive-foreground'
                : 'border-border'
        }">${status}</span>`;
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
    },
    {
      accessorKey: 'amount',
      header: '<div class="text-right">Amount</div>',
      enableSorting: false,
      cell: (info) => {
        const amount = parseFloat(info.getValue<string>());
        const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        return `<div class="text-right font-medium">${formatted}</div>`;
      },
    },
  ];

  protected readonly fullTable = createAngularTable<Payment>(() => ({
    data: PAYMENTS,
    columns: this.fullColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => {
      updater instanceof Function ? this.fullSorting.update(updater) : this.fullSorting.set(updater);
    },
    onColumnFiltersChange: (updater) => {
      updater instanceof Function ? this.fullFilters.update(updater) : this.fullFilters.set(updater);
    },
    onRowSelectionChange: (updater) => {
      updater instanceof Function ? this.fullSelection.update(updater) : this.fullSelection.set(updater);
    },
    state: {
      sorting: this.fullSorting(),
      columnFilters: this.fullFilters(),
      rowSelection: this.fullSelection(),
    },
  }));

  filterByEmail(value: string) {
    this.emailFilter.set(value);
    this.fullTable.getColumn('email')?.setFilterValue(value);
  }
}

// Types
type Product = { id: number; name: string; category: string; price: number; stock: number };
type User = { id: number; name: string; email: string; department: string; location: string };
type Task = { id: number; title: string; status: string; priority: string };
type Payment = { id: string; amount: number; status: 'pending' | 'processing' | 'success' | 'failed'; email: string };
type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  startDate: string;
  salary: number;
  status: 'Active' | 'On Leave';
  manager: string;
};

// Sample Data
const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45 },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150 },
  { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 80 },
  { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 25 },
  { id: 5, name: 'Keyboard', category: 'Accessories', price: 79.99, stock: 100 },
  { id: 6, name: 'Webcam HD', category: 'Electronics', price: 89.99, stock: 60 },
];

const USERS: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', location: 'New York' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', location: 'Los Angeles' },
  { id: 3, name: 'Carol Williams', email: 'carol@company.com', department: 'Engineering', location: 'Chicago' },
  { id: 4, name: 'David Brown', email: 'david@company.com', department: 'Sales', location: 'Houston' },
  { id: 5, name: 'Eva Martinez', email: 'eva@company.com', department: 'Design', location: 'Miami' },
  { id: 6, name: 'Frank Lee', email: 'frank@company.com', department: 'Engineering', location: 'Seattle' },
];

const TASKS: Task[] = [
  { id: 1, title: 'Implement authentication', status: 'Done', priority: 'High' },
  { id: 2, title: 'Design dashboard UI', status: 'In Progress', priority: 'Medium' },
  { id: 3, title: 'Write API documentation', status: 'Todo', priority: 'Low' },
  { id: 4, title: 'Set up CI/CD pipeline', status: 'In Progress', priority: 'High' },
  { id: 5, title: 'Code review', status: 'Todo', priority: 'Medium' },
];

const PAYMENTS: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  { id: 'xk2p91m3', amount: 125, status: 'pending', email: 'john.doe@example.com' },
  { id: 'lq8n45wd', amount: 459, status: 'success', email: 'jane.smith@company.org' },
  { id: 'rt7v23kf', amount: 982, status: 'processing', email: 'alex.wilson@startup.io' },
  { id: 'mn4k82qp', amount: 543, status: 'success', email: 'sarah.connor@future.net' },
  { id: 'yz9w15hj', amount: 167, status: 'pending', email: 'mike.ross@legal.com' },
];

const EMPLOYEES: Employee[] = [
  { id: 1001, firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com', phone: '(555) 123-4567', department: 'Engineering', position: 'Senior Developer', location: 'New York', startDate: '2020-03-15', salary: 125000, status: 'Active', manager: 'Sarah Johnson' },
  { id: 1002, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@company.com', phone: '(555) 234-5678', department: 'Marketing', position: 'Marketing Manager', location: 'Los Angeles', startDate: '2019-07-22', salary: 95000, status: 'Active', manager: 'Michael Brown' },
  { id: 1003, firstName: 'Michael', lastName: 'Wilson', email: 'michael.wilson@company.com', phone: '(555) 345-6789', department: 'Sales', position: 'Sales Representative', location: 'Chicago', startDate: '2021-01-10', salary: 72000, status: 'Active', manager: 'Lisa Anderson' },
  { id: 1004, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@company.com', phone: '(555) 456-7890', department: 'Engineering', position: 'Engineering Director', location: 'New York', startDate: '2017-05-08', salary: 185000, status: 'Active', manager: 'Robert Taylor' },
  { id: 1005, firstName: 'David', lastName: 'Brown', email: 'david.brown@company.com', phone: '(555) 567-8901', department: 'Design', position: 'UI/UX Designer', location: 'San Francisco', startDate: '2020-09-14', salary: 88000, status: 'On Leave', manager: 'Jennifer White' },
  { id: 1006, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa.anderson@company.com', phone: '(555) 678-9012', department: 'Sales', position: 'Sales Director', location: 'Chicago', startDate: '2018-02-28', salary: 145000, status: 'Active', manager: 'Robert Taylor' },
  { id: 1007, firstName: 'James', lastName: 'Taylor', email: 'james.taylor@company.com', phone: '(555) 789-0123', department: 'Engineering', position: 'DevOps Engineer', location: 'Seattle', startDate: '2021-06-01', salary: 115000, status: 'Active', manager: 'Sarah Johnson' },
  { id: 1008, firstName: 'Jennifer', lastName: 'White', email: 'jennifer.white@company.com', phone: '(555) 890-1234', department: 'Design', position: 'Design Director', location: 'San Francisco', startDate: '2016-11-20', salary: 160000, status: 'Active', manager: 'Robert Taylor' },
  { id: 1009, firstName: 'Robert', lastName: 'Martinez', email: 'robert.martinez@company.com', phone: '(555) 901-2345', department: 'HR', position: 'HR Specialist', location: 'Austin', startDate: '2022-03-07', salary: 65000, status: 'Active', manager: 'Amanda Clark' },
  { id: 1010, firstName: 'Amanda', lastName: 'Clark', email: 'amanda.clark@company.com', phone: '(555) 012-3456', department: 'HR', position: 'HR Director', location: 'Austin', startDate: '2015-08-12', salary: 140000, status: 'Active', manager: 'Robert Taylor' },
  { id: 1011, firstName: 'Christopher', lastName: 'Lee', email: 'chris.lee@company.com', phone: '(555) 111-2222', department: 'Engineering', position: 'Frontend Developer', location: 'Boston', startDate: '2021-11-15', salary: 98000, status: 'Active', manager: 'Sarah Johnson' },
  { id: 1012, firstName: 'Jessica', lastName: 'Garcia', email: 'jessica.garcia@company.com', phone: '(555) 222-3333', department: 'Marketing', position: 'Content Strategist', location: 'Miami', startDate: '2020-04-20', salary: 78000, status: 'On Leave', manager: 'Michael Brown' },
];
