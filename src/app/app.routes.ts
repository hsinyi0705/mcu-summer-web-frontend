import { Routes } from '@angular/router';

import { ClearHomeComponent } from './clear-home/clear-home.component';
import { TemiClassComponent } from './temi-class/temi-class.component';
import { WebAppClassComponent } from './web-app-class/web-app-class.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'temi' },
  { path: 'clear-home', component: ClearHomeComponent },
  { path: 'web-app', component: WebAppClassComponent },
  { path: 'temi-class', component: TemiClassComponent },
];
