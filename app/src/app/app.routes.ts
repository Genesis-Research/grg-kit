import { Routes } from '@angular/router';
import { BlocksComponent } from './blocks/blocks.component';
import { ComponentsComponent } from './components/components.component';
import { GrgComponentsComponent } from './grg-components/grg-components.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { DesignTokensComponent } from './design-tokens/design-tokens.component';
import { FaqComponent } from './faq/faq.component';
import { ShowcaseComponent } from './showcase/showcase.component';

export const routes: Routes = [
  { path: '', component: GettingStartedComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'grg-components', component: GrgComponentsComponent },
  { path: 'design-tokens', component: DesignTokensComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'showcase', component: ShowcaseComponent },
];
