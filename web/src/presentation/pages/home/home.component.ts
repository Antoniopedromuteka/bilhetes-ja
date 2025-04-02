import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { CategorySectionComponent } from './categorySection/categorySection.component';
import { EventSectionComponent } from './EventSection/EventSection.component';

const COMPONENTS = [BannerComponent, CategorySectionComponent, EventSectionComponent]

@Component({
  selector: 'app-home',
  imports: [...COMPONENTS],
  template: `
    <main class="w-full h-[calc(100vh - 64px)] mt-[64px] min-h-screen">
      <app-banner />
      <app-category-section/>
      <app-event-section />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
