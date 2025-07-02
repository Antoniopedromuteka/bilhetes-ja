import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardEventComponent } from '../../components/cardEvent/cardEvent.component';
import { Event } from '../../../domain/models/event';
import { EventService } from '../../../app/core/services/event.service';
import { switchMap } from 'rxjs';

const COMPONENTS = [CardEventComponent, RouterLink];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [...COMPONENTS],
  template: `
    <main class="max-w-[1280px] mx-auto min-h-screen mt-[64px] h-auto w-full">
      <div class="py-10 px-3 lg:px-0">
        <div class="flex flex-col gap-2 mb-5">
          <span class="text-xl font-medium">Pesquisa</span>
          <span class="text-2xl font-bold">"{{ search().q }}"</span>
        </div>
        <h4 class="text-xl font-medium text-gray-400">
          {{ events()?.length }} Eventos encontrados
        </h4>
        <section
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
        >
          @for (item of events(); track $index) {
          <app-card-event
            [event]="item"
            [routerLink]="'/event/' + item.id"
          ></app-card-event>
          }
        </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public search = signal<{ q: string; type: string; location: string }>({
    q: '',
    type: '',
    location: '',
  });
  private route = inject(ActivatedRoute);
  public events = signal<Event[] | null>([]);
  eventService = inject(EventService);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.search.set({
            q: params['q'] || '',
            type: params['type'] || '',
            location: params['location'] || '',
          });

          const filterParams: any = {};

          if (this.search().q) filterParams.Nome = this.search().q;
          if (this.search().location)
            filterParams.Local = this.search().location;

          const categoryId = Number(this.search().type);
          if (!isNaN(categoryId) && categoryId > 0) {
            filterParams.CategoriaId = categoryId;
          }

          return this.eventService.getEventByFilter(filterParams);
        })
      )
      .subscribe({
        next: (response) => this.events.set(response),
        error: (error) => console.error('Error fetching events:', error),
      });
  }
}
