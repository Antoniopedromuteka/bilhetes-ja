import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Event, ticket } from '../../../../../domain/models/event';
import { FormatMoneyService } from '../../../../../app/core/services/formatMoney.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-ticket-modal',
  imports: [RouterLink],
  template: `
  <div class="fixed inset-0 bg-gray-50/[var(--bg-opacity)] py-20 [--bg-opacity:80%] flex items-center justify-center p-4 z-50">
  <div class="bg-white rounded-lg w-full max-w-md mx-auto">
    <div class="p-4">
      <h3 class="font-medium text-slate-500 text-lg mb-4">Confirmar ingresso</h3>

      <div class="space-y-2">
        <div>
          <span class="font-medium text-slate-700">Data</span>
          <p class="font-mono">{{ formatDate() }}</p>
        </div>
        <div>
          <span class="font-medium text-slate-700">Categoria escolhida</span>
          <p class="font-mono">{{ event.categoria.nome }}</p>
        </div>
        <div>
          <span class="font-medium text-slate-700">Quantidade</span>
          <p class="font-mono">1</p>
        </div>
      </div>

      <hr class="my-4">

      <div class="flex justify-between items-center">
        <span class="font-medium text-slate-700">Conforme</span>
        <button
          class="text-red-400 cursor-pointer font-semibold"
          (click)="close()">
          Cancelar
        </button>
      </div>

      <div class="my-4">
        <h4 class="font-medium text-slate-700">Comprar (Evento)</h4>
        <p class="font-mono font-medium">{{ event.nome }}</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg">
        <div class="text-center">
          <p class="font-bold font-mono text-2xl">{{ formatMoneyService.formatEuro(ticket.preco) }}</p>
          <p class="font-bold font-mono">{{ ticket.nome }}</p>
        </div>
        <div class="flex flex-col space-y-2 mt-4">
          <button
            routerLink="/checkout/{{ ticket.id }}"
            class="bg-primary text-white py-2 px-4 rounded font-medium hover:bg-purple-700 cursor-pointer transition">
            Comprar
          </button>
          <button
            class="border border-gray-400 py-2 px-4 rounded font-medium cursor-pointer hover:bg-gray-50 transition">
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmTicketModalComponent {
   @Output() closeModal = new EventEmitter<void>();
   @Input() ticket!: ticket;
   @Input() event!: Event;
   formatMoneyService = inject(FormatMoneyService);

   ngOnInit() {
   }

  close() {
    this.closeModal.emit();
  }


  formatDate(){
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(this.event?.dataEvento).toLocaleDateString('pt-PT', options);
  }

}
