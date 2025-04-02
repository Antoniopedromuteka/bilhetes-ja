import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-ticket-buy',
  imports: [],
  template: `
    <div class="border border-gray-200 p-3 rounded-md">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-slate-600 font-medium">Valor Normal</span>
          <span class="text-start text-slate-500 text-sm"
            >500 ingressos disponíveis</span
          >
        </div>
        <div>
          <span class="text-start text-primary font-medium">R$ 50,00</span>
        </div>
      </div>
      <button
        class="w-full mt-4 bg-primary text-white rounded-md py-2 flex items-center justify-center gap-2 cursor-pointer"
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
          class="lucide lucide-ticket-icon lucide-ticket"
        >
          <path
            d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        <span>Comprar</span>
      </button>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTicketBuyComponent {}
