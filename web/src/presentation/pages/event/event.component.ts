import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardEventComponent } from '../../components/cardEvent/cardEvent.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchSectionComponent } from '../../components/searchSection/searchSection.component';

const MODULES = [MatPaginatorModule];
const COMPONENTS = [CardEventComponent, SearchSectionComponent];

@Component({
  selector: 'app-event',
  imports: [...COMPONENTS, ...MODULES],
  template: `<main class="w-full h-[calc(100vh-64px)] h-auto mt-[64px]">
    <section
      class="w-full max-w-[1280px] px-3 h-auto xl:px-0 mx-auto py-10"
    >
    <div class="w-full flex items-center justify-between mt-10">
      <h3 class="text-3xl font-semibold">Próximos Eventos</h3>
      <div class="text-slate-500 text-lg">
        6 eventos encontrados
      </div>
    </div>
    <app-search-section />
    <main class="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-auto">
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
    </main>
    <div class="mt-10">
      <mat-paginator [length]="100" [pageIndex]="0" [pageSize]="10" (page)="onPageChange($event)"></mat-paginator>
    </div>
  </section>
  </main> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {

  onPageChange(event: any) {
    console.log('Page changed to: ', event.pageIndex);
    console.log('Number of items per page: ', event.pageSize);
  }
}
