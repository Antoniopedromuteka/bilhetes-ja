import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../presentation/components/dashboardLayout/dashboardLayout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../presentation/pages/dashboard/dashHome/dashHome.component').then((m) => m.DashHomeComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      }
    ]
  },
];
