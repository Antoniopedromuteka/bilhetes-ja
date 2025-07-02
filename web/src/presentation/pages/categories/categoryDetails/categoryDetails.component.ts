import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';
import { Category } from '../../../../domain/models/category';
import { CategoryService } from '../../../../app/core/services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../../app/core/services/loader.service';
import { EventService } from '../../../../app/core/services/event.service';
import { Event } from '../../../../domain/models/event';

const COMPONENTS = [CardEventComponent];

@Component({
  selector: 'app-category-details',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <section class="w-full nin-h-screen h-auto mt-[64px]">
      <div class="w-full h-[16rem] bg-primary py-10">
        <div class="max-w-[1280px] mx-auto h-full flex items-end">
          <h2 class="text-6xl text-white font-semibold">
            {{ category()?.nome }}
          </h2>
        </div>
      </div>
    </section>
    <main class="max-w-[1280px] mx-auto h-auto w-full">
      <div class="py-10">
        <h4 class="text-xl font-medium text-gray-400">
          {{ events().length }} Eventos encontrados
        </h4>
        <section class="grid grid-cols-3 gap-5 mt-10">
          @for (event of events(); track event.id) {

          <app-card-event [event]="event" [routerLink]="'/event/' + event.id" />
          }
        </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailsComponent {
  category = signal<Category | null>(null);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  public events = signal<Event[]>([]);
  private isLoading = inject(LoaderService);
  private eventService = inject(EventService);

  ngOnInit(): void {
    this.LoadDatas();
  }

  LoadDatas() {
    const paramID = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(Number(paramID)).subscribe({
      next: (category) => {
        this.category.set(category);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/categories']);
      },
    });

    this.isLoading.show();
    this.eventService.getEventsByCategory(Number(paramID)).subscribe({
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
