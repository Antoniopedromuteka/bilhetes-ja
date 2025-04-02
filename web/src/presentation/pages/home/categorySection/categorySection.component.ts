import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardCategoryComponent } from '../../../components/cardCategory/cardCategory.component';
import { CARD_MOCKS } from '../../../../lib/mocks/card';

const COMPONENTS = [CardCategoryComponent]
@Component({
  selector: 'app-category-section',
  imports: [...COMPONENTS],
  template: `
    <main class="w-full px-3 xl:px-0 h-auto bg-gray-100">
      <div class="max-w-[1280px] mx-auto">
        <h3 class="text-center font-bold text-3xl pt-12">Categorias</h3>
      <section class="w-full h-auto grid xl:grid-cols-4 md:grid-cols-4 grid-cols-2 mt-8 pb-20 gap-8">
        @for (item of cards; track $index) {
          <app-card-category class="w-full" [cardItem]="item"></app-card-category>
        }
      </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySectionComponent {
  public cards = CARD_MOCKS
}
