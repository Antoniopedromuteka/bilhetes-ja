import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';

const COMPONENTS = [CardEventComponent]

@Component({
  selector: 'app-event-section',
  imports: [CardEventComponent],
  template: `
    <main class="w-full px-3 xl:px-0 h-auto bg-white">
      <h3 class="text-center font-bold text-3xl pt-12">Eventos em Destaque</h3>
      <!-- Eventos -->
      <section class="w-full h-auto grid xl:grid-cols-3 md:grid-cols-3 grid-cols-2 mt-8 pb-20 xl:gap-6 gap-4">
        <app-card-event />
        <app-card-event />
        <app-card-event />
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSectionComponent { }
