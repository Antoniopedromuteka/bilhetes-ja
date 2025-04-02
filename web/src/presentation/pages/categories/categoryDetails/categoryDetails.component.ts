import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';

const COMPONENTS = [CardEventComponent];

@Component({
  selector: 'app-category-details',
  imports: [...COMPONENTS],
  template: `
    <section class="w-full h-[calc(100vh-64px)] h-auto mt-[64px]">
      <div class="w-full h-[16rem] bg-primary py-10">
        <div class="max-w-[1280px] mx-auto h-full flex items-end">
          <h2 class="text-6xl text-white font-semibold">Arte & Cultura</h2>
        </div>
      </div>
    </section>
    <main class="max-w-[1280px] mx-auto h-auto w-full">
      <div class="py-10">
        <h4 class="text-xl font-medium text-gray-400">8 Eventos encontrados</h4>
        <section class="grid grid-cols-3 gap-5 mt-10">
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
        </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailsComponent { }
