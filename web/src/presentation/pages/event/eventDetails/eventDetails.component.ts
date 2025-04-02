import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardTicketBuyComponent } from '../../../components/cardTicketBuy/cardTicketBuy.component';

const COMPONENTS = [CardTicketBuyComponent]

@Component({
  selector: 'app-event-details',
  imports: [...COMPONENTS],
  template: `<main class="w-full h-[calc(100vh-64px)] h-auto mt-[64px]">
    <section
      class="w-full max-w-[1280px] px-3 xl:px-0 mx-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto"
    >
      <div class="w-full col-span-full lg:col-span-8">
        <div class="w-full h-[400px] bg-black rounded-md"></div>
        <div class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold mt-8">Festival de Verão 2024</h3>
          <div class="w-full flex flex-col gap-3">
            <div class="w-full flex items-center justify-between">
              <div class="w-full">
                <span class="text-slate-600">15 Mar 2024</span>
              </div>
              <div class="w-full">
                <span class="text-start text-slate-600">16:00</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="w-full">
                <span class="text-slate-600"
                  >Praia de Copacabana, Rio de Janeiro</span
                >
              </div>
              <div class="w-full">
                <span class="text-start text-slate-600"
                  >Capacidade: 1000 pessoas</span
                >
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="font-medium text-2xl">Sobre o Evento</h3>
            <p class="text-slate-600">
              O maior festival de música do verão está de volta! Com mais de 20
              atrações nacionais e internacionais, food trucks, área de descanso
              e muito mais.
            </p>
          </div>
        </div>
      </div>
      <div
        class="lg:col-span-4 col-span-full place-self-center lg:place-self-start w-full max-w-[600px] lg:max-w-full shadow-md shadow-gray-200 rounded-md p-4 sticky top-20 max-h-[500px] overflow-y-auto"
      >
        <h3 class="text-2xl font-medium">Ingressos</h3>
        <div class="mt-4 flex flex-col gap-4">
          <app-card-ticket-buy/>
          <app-card-ticket-buy/>
          </div>
      </div>
    </section>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {}
