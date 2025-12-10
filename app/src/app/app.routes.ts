import { Routes } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { DataTableComponent } from './data-table/data-table.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ComponentsComponent } from './components/components.component';
import { GrgComponentsComponent } from './grg-components/grg-components.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { FaqComponent } from './faq/faq.component';

export const routes: Routes = [
  { path: '', component: GettingStartedComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'grg-components', component: GrgComponentsComponent },
  { path: 'faq', component: FaqComponent },
];
