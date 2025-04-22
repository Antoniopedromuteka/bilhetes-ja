import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { CategorySectionComponent } from './categorySection/categorySection.component';
import { EventSectionComponent } from './EventSection/EventSection.component';
import { SearchSectionComponent } from '../../components/searchSection/searchSection.component';
import { HowBuyComponent } from '../../components/howBuy/howBuy.component';

const COMPONENTS = [BannerComponent, CategorySectionComponent, EventSectionComponent, SearchSectionComponent, HowBuyComponent]

@Component({
  selector: 'app-home',
  imports: [...COMPONENTS],
  template: `
    <main class="w-full mt-[64px] h-auto">
      <app-banner />
      <app-category-section/>
      <app-event-section />
      <section class="xl:max-w-[1280px] w-full h-auto mx-auto mb-4 px-3 xl:px-0">
        <h3 class="font-semibold text-xl">Descubra Eventos na sua cidade</h3>
        <app-search-section />
      </section>
      <app-how-buy />
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
