import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardTicketBuyComponent } from '../../../components/cardTicketBuy/cardTicketBuy.component';
import { Event, ticket } from '../../../../domain/models/event';
import { EventService } from '../../../../app/core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../app/core/services/loader.service';
import { ConfirmTicketModalComponent } from './confirm-ticket-modal/confirm-ticket-modal.component';
import { FormatMoneyService } from '../../../../app/core/services/formatMoney.service';

const COMPONENTS = [CardTicketBuyComponent, ConfirmTicketModalComponent];

@Component({
  selector: 'app-event-details',
  imports: [...COMPONENTS],
  template: `<main class="w-full min-h-screen h-auto mt-[64px]">
    @if(showModal()){
      <app-confirm-ticket-modal [ticket]="ticket()" [event]="event()" (closeModal)="showModal.set(false)"/>
    }
    <section
      class="w-full max-w-[1280px] px-3 xl:px-0 mx-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto"
    >
      <div class="w-full col-span-full lg:col-span-8">
        <div class="w-full h-[400px] bg-black rounded-md"></div>
        <div class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold mt-8">{{ event()?.nome }}</h3>
          <div class="w-full flex flex-col gap-3">
            <div class="w-full flex items-center justify-between">
              <div class="w-full">
                <span class="text-slate-600">{{ formatDate() }}</span>
              </div>
              <div class="w-full">
                <span class="text-start text-slate-600">
                  Categoria: {{ event()?.categoria?.nome }}
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="w-full">
                <span class="text-slate-600"
                  >{{ event()?.local }}</span
                >
              </div>
              <div class="w-full">
                <span class="text-start text-slate-600"
                  >Capacidade: {{ event()?.lotacaoTotal }}</span
                >
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="font-medium text-2xl">Sobre o Evento</h3>
            <p class="text-slate-600">
              {{ event()?.descricao }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="lg:col-span-4 col-span-full place-self-center lg:place-self-start w-full max-w-[600px] lg:max-w-full shadow-md shadow-gray-200 rounded-md p-4 sticky top-20 max-h-[500px] overflow-y-auto"
      >
        <h3 class="text-2xl font-medium">Ingressos</h3>
        <div class="mt-4 flex flex-col gap-4">
          @for(ticket of event()?.tiposBilhetes; track ticket.id) {
            <app-card-ticket-buy [ticket]="ticket" (openModal)="handleOpenModal(ticket)" />
          }
        </div>
      </div>
    </section>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  public event = signal<Event | any>({})
  public ticket = signal<ticket | any>({})
  public eventService = inject(EventService);
  public showModal = signal<boolean>(false);
  route = inject(ActivatedRoute)
  router = inject(Router)
  public isLoading = inject(LoaderService)

  ngOnInit(): void {
    this.isLoading.show();
    const paramID = this.route.snapshot.paramMap.get('id');
    if (paramID) {
      this.eventService.getEvent(Number(paramID)).subscribe({
        next: (event) => {
          this.event.set(event);
          this.isLoading.hide();
        },
        error: (error) => {
          console.error(error);
          this.router.navigate(['/events']);
          this.isLoading.hide();
        },
      });
    } else {
      this.router.navigate(['/events']);
    }

    console.log(this.showModal());

  }

  formatDate(){
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(this.event()?.dataEvento).toLocaleDateString('pt-PT', options);
  }

  handleOpenModal(ticket: ticket){
    this.ticket.set(ticket);
    this.showModal.set(true);
  }
}
