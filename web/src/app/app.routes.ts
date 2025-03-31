import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../presentation/pages/home/home.component').then((m) => m.HomeComponent)
  }
];
