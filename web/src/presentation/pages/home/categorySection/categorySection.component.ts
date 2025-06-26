import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardCategoryComponent } from '../../../components/cardCategory/cardCategory.component';
import { Category } from '../../../../domain/models/category';
import { CategoryService } from '../../../../app/core/services/category.service';
import { RouterLink } from '@angular/router';

const COMPONENTS = [CardCategoryComponent]
const MODULES = [RouterLink]
@Component({
  selector: 'app-category-section',
  imports: [...COMPONENTS, ...MODULES],
  template: `
    <main class="w-full px-3 xl:px-0 h-auto bg-gray-100">
      <div class="max-w-[1280px] mx-auto">
      <h3 class="text-center font-bold text-3xl pt-12">Categorias</h3>
      <section class="w-full h-auto grid xl:grid-cols-4 md:grid-cols-4 grid-cols-2 mt-8 pb-5 gap-8">
        @for (item of categories(); track $index) {
          <app-card-category class="w-full" [cardItem]="item"></app-card-category>
        }
      </section>
      <div class="w-full flex justify-center pb-4">
        <button class="bg-primary px-7 py-2 rounded-md">
          <span class="text-center text-sm font-medium text-white cursor-pointer" routerLink="/categories">Ver mais</span>
        </button>
      </div>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySectionComponent {
  public categories = signal<Category[] | null>([])
  private categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.set(categories.slice(0, 4))
    })
  }

}
