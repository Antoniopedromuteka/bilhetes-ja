import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardEventComponent } from '../../components/cardEvent/cardEvent.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchSectionComponent } from '../../components/searchSection/searchSection.component';
import { LoaderService } from '../../../app/core/services/loader.service';
import { EventService } from '../../../app/core/services/event.service';
import { Event } from '../../../domain/models/event';
import { RouterLink } from '@angular/router';

const MODULES = [MatPaginatorModule, RouterLink];
const COMPONENTS = [CardEventComponent, SearchSectionComponent];

@Component({
  selector: 'app-event',
  imports: [...COMPONENTS, ...MODULES],
  template: `<main class="w-full min-h-screen h-auto mt-[64px]">
    <section class="w-full max-w-[1280px] px-3 h-auto xl:px-0 mx-auto py-10">
      <div class="w-full flex items-center justify-between mt-10">
        <h3 class="text-3xl font-semibold">Próximos Eventos</h3>
        <div class="text-slate-500 text-lg">
          {{ events().length }} eventos encontrados
        </div>
      </div>
      <app-search-section />
      <main
        class="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-auto"
      >
        @for (event of events(); track event.id) {
        <app-card-event [event]="event" [routerLink]="'/event/' + event.id" />
        }
      </main>
      <div class="mt-10">
        <!-- <mat-paginator  [length]="100" [pageIndex]="0" [pageSize]="10" (page)="onPageChange($event)"></mat-paginator> -->
      </div>
    </section>
  </main> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
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

  onPageChange(event: any) {
    console.log('Page changed to: ', event.pageIndex);
    console.log('Number of items per page: ', event.pageSize);
  }
}
