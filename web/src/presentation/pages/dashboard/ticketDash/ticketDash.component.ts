import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-ticket-dash',
  imports: [...COMPONENTS],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDashComponent {
  breadcrumbItems = {
    label: 'Dashboard',
    url: '/dashboard',
    items: [
      {
        label: 'Meus blihetes',
        url: '/dashboard/tickets',
      },
    ],
  };
}
