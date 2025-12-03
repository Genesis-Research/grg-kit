import { Routes } from '@angular/router';
import { DemosComponent } from './demos/demos.component';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ComponentsComponent } from './components/components.component';
import { GrgComponentsComponent } from './grg-components/grg-components.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

export const routes: Routes = [
  { path: '', component: GettingStartedComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'demos', component: DemosComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: 'layouts', component: LayoutsComponent },
  { path: 'blocks', component: GrgComponentsComponent },
];
