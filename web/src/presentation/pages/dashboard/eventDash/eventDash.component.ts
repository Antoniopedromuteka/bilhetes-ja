import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-event-dash',
  imports: [...COMPONENTS],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDashComponent {
  breadcrumbItems = {
    label: 'Dashboard',
    url: '/dashboard',
    items: [
      {
        label: 'Eventos',
        url: '/dashboard/events',
      },
    ],
  };
 }
