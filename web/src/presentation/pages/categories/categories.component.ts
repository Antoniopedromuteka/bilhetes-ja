import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardCategoryComponent } from '../../components/cardCategory/cardCategory.component';
import { CARD_MOCKS } from '../../../lib/mocks/card';

const COMPONENTS = [CardCategoryComponent];

@Component({
  selector: 'app-categories',
  imports: [...COMPONENTS],
  template: `<main class="w-full h-[calc(100vh-64px)] h-auto mt-[64px]">
    <section class="w-full max-w-[1280px] px-3 h-auto xl:px-0 mx-auto py-10">
      <div class="">
        <h3 class="font-bold text-3xl">Categorias</h3>
      </div>
      <main
        class="w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10"
      >
        @for (item of cards; track $index) {
        <app-card-category class="w-full" [cardItem]="item"></app-card-category>
        }
      </main>
    </section>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  public cards = CARD_MOCKS;
}
