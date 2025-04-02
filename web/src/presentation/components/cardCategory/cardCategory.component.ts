import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-category',
  imports: [],
  template: `
    <div
      class="xl:max-w-[300px] cursor-pointer w-full h-[150px] bg-secondary border border-gray-200 rounded-md flex gap-1 items-center justify-center flex-col"
    >
      <div class="text-primary" [innerHTML]="sanitizeIcon(cardItem.icon)"></div>
      <div>
        <span class="text-xl font-medium">{{ cardItem.title }}</span>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCategoryComponent {
  @Input() cardItem!: Card;
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}

type Card = {
  title: string;
  icon: string;
};
