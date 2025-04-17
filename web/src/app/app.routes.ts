import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../presentation/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'event/:id',
    loadComponent: () => import('../presentation/pages/event/eventDetails/eventDetails.component').then((m) => m.EventDetailsComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('../presentation/pages/event/event.component').then((m) => m.EventComponent)
  },
  {
    path: 'create-event',
    loadComponent: () => import('../presentation/pages/create-event/create-event.component').then((m) => m.CreateEventComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('../presentation/pages/categories/categories.component').then((m) => m.CategoriesComponent)
  },
  {
    path: 'categories/:id',
    loadComponent: () => import('../presentation/pages/categories/categoryDetails/categoryDetails.component').then((m) => m.CategoryDetailsComponent)
  },
  {
    path: 'search/:searchTerm',
    loadComponent: () => import('../presentation/pages/search/search.component').then((m) => m.SearchComponent)
  }
];
