import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { CategorySectionComponent } from './categorySection/categorySection.component';
import { EventSectionComponent } from './EventSection/EventSection.component';

const COMPONENTS = [BannerComponent, CategorySectionComponent, EventSectionComponent]

@Component({
  selector: 'app-home',
  imports: [...COMPONENTS],
  template: `
    <main class="w-full min-h-screen max-w-[1280px] mx-auto">
      <app-banner />
      <app-category-section/>
      <app-event-section />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
