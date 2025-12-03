import { Routes } from '@angular/router';
import { DemosComponent } from './demos/demos.component';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { DataTableComponent } from './data-table/data-table.component';

export const routes: Routes = [
  { path: '', component: DemosComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'data-table', component: DataTableComponent },
];
