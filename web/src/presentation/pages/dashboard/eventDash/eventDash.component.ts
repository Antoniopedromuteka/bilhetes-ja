import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TableComponent } from "../../../components/table/table.component";
import { RouterLink } from '@angular/router';

const COMPONENTS = [
  BreadcrumbComponent,
  TableComponent
];

@Component({
  selector: 'app-event-dash',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-2xl font-medium">Meus Eventos</h2>
        </div>
        <div class="w-full flex justify-end">
          <button class="bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:brightness-90" routerLink="/dashboard/events/new">Criar Evento</button>
        </div>
        <section class="w-full h-auto mt-5">
          <app-table />
        </section>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDashComponent {
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Eventos',
        url: '/dashboard/events',
      },
    ],
  };
}
