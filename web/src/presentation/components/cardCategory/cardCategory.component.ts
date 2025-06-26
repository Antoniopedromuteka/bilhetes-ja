import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-category',
  imports: [RouterLink],
  template: `
    <div
      routerLink="/categories/{{ cardItem.id }}"
      class="xl:max-w-[300px] cursor-pointer w-full h-[150px] bg-secondary border border-gray-200 rounded-md flex gap-1 items-center justify-center flex-col"
    >
      <div class="text-primary" [innerHTML]="sanitizedIcon">
      </div>
      <div>
        <span class="text-xl font-medium">{{ cardItem.nome }}</span>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCategoryComponent {
  @Input() cardItem!: Card;
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  sanitizedIcon!: SafeHtml;

  ngOnChanges(): void {
    if (this.cardItem?.iconUrl) {
      this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(
        atob(this.cardItem.iconUrl.split(',')[1])
      );
    }
  }
}

type Card = {
  id: number;
  nome: string;
  iconUrl: string;
};
