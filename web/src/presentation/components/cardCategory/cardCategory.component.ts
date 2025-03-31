import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-category',
  imports: [],
  template: `
    <div
      class="xl:max-w-[200px] w-full h-[150px] bg-secondary border border-gray-200 rounded-md flex items-center justify-center flex-col"
    >
      <span class="text-primary">{{ cardItem.icon }}</span>
      <div>{{ cardItem.title }}</div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCategoryComponent {
  @Input() cardItem!: Card
}

type Card = {
  title: string;
  icon: string;
}
