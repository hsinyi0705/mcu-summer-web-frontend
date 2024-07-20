import { Routes } from '@angular/router';

import { TemiClassComponent } from './temi-class/temi-class.component';
import { WebAppClassComponent } from './web-app-class/web-app-class.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'temi' },
  { path: 'web-app', component: WebAppClassComponent },
  { path: 'temi-class', component: TemiClassComponent },
];
