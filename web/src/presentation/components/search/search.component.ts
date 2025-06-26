import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  signal,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  template: `
    <div
      #elementRef
      class="w-full xl:w-1/3 border p-2 flex items-center gap-2 rounded-md border-gray-200"
      (click)="toggleSearch()"
      [class.border-primary]="isActive()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-search-icon lucide-search text-gray-400"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        #searchInput
        type="search"
        (keydown.enter)="onEnter()"
        placeholder="Pesquisar eventos..."
        class="outline-none w-full"
      />
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public isActive = signal<boolean>(false);
  private elementRef: ElementRef = inject(ElementRef);
  public searchTerm = signal<string>('');
  public router = inject(Router);

  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  toggleSearch() {
    this.isActive.set(!this.isActive());
    setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isActive.set(false);
    }
  }

  onEnter() {
    const term = this.searchInput?.nativeElement.value.trim();
      this.searchTerm.set(term);
      this.router.navigate(['/search'], {
        queryParams: { q: term || null },
      });
      this.isActive.set(false);
  }
}
