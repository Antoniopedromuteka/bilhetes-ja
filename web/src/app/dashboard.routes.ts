import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/components/dashboardLayout/dashboardLayout.component').then(m => m.DashboardLayoutComponent),
      children: [
      {
        path: 'home',
        loadComponent: () => import('../presentation/pages/dashboard/dashHome/dashHome.component').then((m) => m.DashHomeComponent),
      },
      {
        path: 'wallet',
        loadComponent: () => import('../presentation/pages/dashboard/wallet/wallet.component').then((m) => m.WalletComponent)
      },
      {
        path: 'tickets',
        loadComponent: () => import('../presentation/pages/dashboard/ticketDash/ticketDash.component').then((m) => m.TicketDashComponent)
      },
      {
        path: 'events',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/eventDash.component').then((m) => m.EventDashComponent),
      },
      {
        path: 'events/new',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/new/new.component').then((m) => m.NewComponent)
      },
      {
        path: 'events/update/:id',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/edit/edit.component').then((m) => m.EditComponent)
      },
      {
        path: 'events/:id/tickets',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/tickets/tickets.component').then((m) => m.TicketsComponent)
      },
      {
        path: 'events/:id/tickets/new',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/tickets/newTicket/newTicket.component').then((m) => m.NewTicketComponent)
      },
      {
        path: 'events/:id/tickets/update/:ticketTypeId',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/tickets/updateTicket/updateTicket.component').then((m) => m.UpdateTicketComponent)
      },
      {
        path: 'events/:id/ticketsSold',
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/ticketsSold/ticketsSold.component').then((m) => m.TicketsSoldComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../presentation/pages/dashboard/settings/settings.component').then((m) => m.SettingsComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ]
  },
];
