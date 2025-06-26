import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../domain/models/category';
import { CategoryService } from '../../../app/core/services/category.service';

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full rounded-md bg-gray-100 md:h-[8rem] py-5 h-auto mt-10 flex flex-col md:flex-row items-center px-5 gap-2">
      <input
        #termInput
        type="search"
        placeholder="Buscar eventos..."
        class="border p-3 md:max-w-[400px] w-full outline-none rounded-md border-gray-200 bg-white"
      />

      <select #typeSelect class="border p-3 md:max-w-[300px] w-full outline-none rounded-md border-gray-200 bg-white">
        <option value="">Todos os tipos de eventos</option>
        @for (category of categories(); track category.id) {
          <option [value]="category.id">{{ category.nome }}</option>
        }
      </select>

      <input
        #locationInput
        type="search"
        placeholder="Local"
        class="border p-3 md:max-w-[300px] w-full outline-none rounded-md border-gray-200 bg-white"
      />

      <div class="flex w-full justify-end">
        <button
          (click)="onSearch()"
          class="border p-2 bg-primary text-white max-w-[200px] w-full cursor-pointer text-lg rounded-md"
        >
          <span>Procurar</span>
        </button>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSectionComponent {
  @ViewChild('termInput') termInput!: ElementRef<HTMLInputElement>;
  @ViewChild('typeSelect') typeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;
  public categories = signal<Category[]>([]);
  categoryService = inject(CategoryService);
  private router = inject(Router);

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearch() {
    const term = this.termInput?.nativeElement.value.trim();
    const type = this.typeSelect?.nativeElement.value.trim();
    const location = this.locationInput?.nativeElement.value.trim();

    this.router.navigate(['/search'], {
      queryParams: {
        q: term || null,
        type: type || null,
        location: location || null,
      },
    });
  }
}
