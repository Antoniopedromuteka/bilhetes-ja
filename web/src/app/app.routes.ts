import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../presentation/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: 'event/:id',
        loadComponent: () =>
          import(
            '../presentation/pages/event/eventDetails/eventDetails.component'
          ).then((m) => m.EventDetailsComponent),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('../presentation/pages/event/event.component').then(
            (m) => m.EventComponent
          ),
      },
      {
        path: 'auth/sign-in',
        loadComponent: () =>
          import('../presentation/pages/auth/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'auth/reset-password',
        loadComponent: () =>
          import(
            '../presentation/pages/auth/reset-password/reset-password.component'
          ).then((m) => m.ResetPasswordComponent),
      },
      {
        path: 'auth/sign-up',
        loadComponent: () =>
          import('../presentation/pages/auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'create-event',
        loadComponent: () =>
          import(
            '../presentation/pages/create-event/create-event.component'
          ).then((m) => m.CreateEventComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../presentation/pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import(
            '../presentation/pages/categories/categoryDetails/categoryDetails.component'
          ).then((m) => m.CategoryDetailsComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../presentation/pages/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'checkout/:ticketId',
        loadComponent: () =>
          import('../presentation/pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'ticket/:id',
        loadComponent: () =>
          import('../presentation/pages/ticket/ticket.component').then(
            (m) => m.TicketComponent
          ),
      }
    ],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
    import('../app/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
];
