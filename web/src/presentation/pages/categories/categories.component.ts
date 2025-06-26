import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardCategoryComponent } from '../../components/cardCategory/cardCategory.component';
import { CARD_MOCKS } from '../../../lib/mocks/card';
import { Category } from '../../../domain/models/category';
import { CategoryService } from '../../../app/core/services/category.service';

const COMPONENTS = [CardCategoryComponent];

@Component({
  selector: 'app-categories',
  imports: [...COMPONENTS],
  template: `<main class="w-full min-h-screen h-auto mt-[64px]">
    <section class="w-full max-w-[1280px] px-3 h-auto xl:px-0 mx-auto py-10">
      <div class="">
        <h3 class="font-bold text-3xl">Categorias</h3>
      </div>
      <main
        class="w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10"
      >
        @for (item of categories(); track $index) {
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
  public categories = signal<Category[] | null>([])
  private categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.set(categories)
    })
  }

}
