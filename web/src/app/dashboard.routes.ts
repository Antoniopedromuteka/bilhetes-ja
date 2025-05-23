import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/components/dashboardLayout/dashboardLayout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('../presentation/pages/dashboard/dashHome/dashHome.component').then((m) => m.DashHomeComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
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
        loadComponent: () => import('../presentation/pages/dashboard/eventDash/eventDash.component').then((m) => m.EventDashComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('../presentation/pages/dashboard/settings/settings.component').then((m) => m.SettingsComponent)
      }
    ]
  },
];
