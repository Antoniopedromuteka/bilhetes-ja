import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { Event } from '../../../../domain/models/event';
import { EventService } from '../../../../app/core/services/event.service';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';
import { RouterLink } from '@angular/router';

const COMPONENTS = [
  BreadcrumbComponent,
  CardEventComponent
];

@Component({
  selector: 'app-ticket-dash',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-xl font-medium">Bilhetes Comprados</h2>
        </div>
        <section class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for(item of events(); track $index){
            <div class="border rounded-md" routerLink="/ticket/{{item.id}}">
              <app-card-event [event]="item" />
            </div>
          }
        </section>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDashComponent {
  events = signal<Event[]>([]);
  eventService = inject(EventService)
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Meus blihetes',
        url: '/dashboard/tickets',
      },
    ],
  };

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events.set(events?.map((event) => {
        return {
          ...event,
          tiposBilhetes: null!
        }
      }));
    });
  }
}
