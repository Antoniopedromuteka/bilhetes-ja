import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-settings',
  imports: [...COMPONENTS],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  breadcrumbItems = {
    label: 'Dashboard',
    url: '/dashboard',
    items: [
      {
        label: 'Configurações',
        url: '/dashboard/settings',
      },
    ],
  };
}
