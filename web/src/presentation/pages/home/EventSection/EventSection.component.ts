import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';
import { EventService } from '../../../../app/core/services/event.service';
import { Event } from '../../../../domain/models/event';
import { LoaderService } from '../../../../app/core/services/loader.service';
import { RouterLink } from '@angular/router';

const COMPONENTS = [CardEventComponent];

@Component({
  selector: 'app-event-section',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <main class="w-full px-3 xl:px-0 h-auto bg-white">
      <div class="max-w-[1280px] mx-auto">
        <h3 class="text-center font-bold text-3xl pt-12">
          Eventos em Destaque
        </h3>
        <!-- Eventos -->
        <section
          class="w-full h-auto grid xl:grid-cols-3 md:grid-cols-3 grid-cols-2 mt-8 pb-20 xl:gap-10 gap-4"
        >
          @for (event of events().slice(0, 6); track event.id) {
          <app-card-event [event]="event" [routerLink]="'/event/' + event.id" />
          }
        </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSectionComponent {
  public events = signal<Event[]>([]);
  private isLoading = inject(LoaderService);
  private eventService = inject(EventService);

  ngOnInit() {
    this.isLoading.show();
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events.set(response);
        this.isLoading.hide();
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.isLoading.hide();
      },
    });
  }
}
