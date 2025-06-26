import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { ticket } from '../../../domain/models/event';
import { FormatMoneyService } from '../../../app/core/services/formatMoney.service';


@Component({
  selector: 'app-card-ticket-buy',
  imports: [],
  template: `
    <div class="border border-gray-200 p-3 rounded-md">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-slate-600 font-medium">{{ ticket.nome }}</span>
          <span class="text-start text-slate-500 text-sm"
            >{{ ticket.quantidade }} ingressos disponíveis</span
          >
        </div>
        <div>
          <span class="text-start text-primary font-medium">{{ formatService.formatEuro(ticket.preco) }}</span>
        </div>
      </div>
      <button
          (click)="openModalEvent()"
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
export class CardTicketBuyComponent {
  @Input() ticket!: ticket;
  @Output() openModal = new EventEmitter<void>();
  formatService = inject(FormatMoneyService)


  openModalEvent() {
    this.openModal.emit();
  }

}
