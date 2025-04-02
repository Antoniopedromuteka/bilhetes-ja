import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../presentation/pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'event/:id',
    loadComponent: () => import('../presentation/pages/event/eventDetails/eventDetails.component').then((m) => m.EventDetailsComponent)
  }
];
