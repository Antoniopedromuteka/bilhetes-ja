import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-wallet',
  imports: [...COMPONENTS],
  template: `
    <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent {
  breadcrumbItems = {
    label: 'Dashboard',
    url: '/dashboard',
    items: [
      {
        label: 'Carteira',
        url: '/dashboard/wallet',
      },
    ],
  };
}
