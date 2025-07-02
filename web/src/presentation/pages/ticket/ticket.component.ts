import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { EventService } from '../../../app/core/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { ITicket, TicketService } from '../../../app/core/services/ticket.service';
import { Event } from '../../../domain/models/event';
import { of, switchMap, tap } from 'rxjs';

const COMPONENTS = [QRCodeComponent];

@Component({
  selector: 'app-ticket',
  imports: [...COMPONENTS],
  template: `
    <main
      class="max-w-[1248px] mx-auto min-h-screen mt-[64px] flex items-center justify-center"
    >
      <div
        class="relative max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div class="relative py-4 px-6 bg-primary text-white">
          <div
            class="absolute -bottom-2 left-0 right-0 h-4 flex justify-between"
            style="background-image: radial-gradient(circle at 50% 0, white 25%, transparent 25%), radial-gradient(circle at 50% 0, white 25%, transparent 25%); background-size: 20px 20px; background-position: 0 0, 10px 10px;"
          ></div>

          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold truncate">{{ ticket()?.ticketType?.nome }}</h2>
            <span class="text-white">
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
                class="lucide lucide-ticket h-8 w-8 text-white"
              >
                <path
                  d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                ></path>
                <path d="M13 5v2"></path>
                <path d="M13 17v2"></path>
                <path d="M13 11v2"></path>
              </svg>
            </span>
          </div>
          <p class="mt-2 text-indigo-100 truncate">{{ event()?.descricao }}</p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Data</p>
              <p class="font-semibold">{{ this.formatDate(event()?.dataEvento!) }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Local</p>
              <p class="font-semibold truncate">{{ event()?.local }}</p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-dashed border-gray-300">
            <div class="w-full flex justify-center">
              <qrcode
                [qrdata]="ticket()?.codigoQR ?? ''"
                [allowEmptyString]="true"
                [ariaLabel]="'QR Code image with the following content...'"
                [cssClass]="'center'"
                [colorDark]="'#000000ff'"
                [colorLight]="'#ffffffff'"
                [elementType]="'canvas'"
                [errorCorrectionLevel]="'M'"
                [imageHeight]="75"
                [imageWidth]="75"
                [margin]="4"
                [scale]="1"
                [title]="event()?.descricao"
                [width]="300"
              ></qrcode>
            </div>
            <p class="text-center text-xs mt-2 text-gray-500">
              Apresente este ingresso na entrada
            </p>
            <div class="w-full flex justify-center">
              <button (click)="printTicket()" class="mt-2  cursor-pointer rounded-md max-w-[200px] p-2 w-full bg-primary text-white">
                <span class="text-sm font-medium">Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        <div
          class="absolute -top-2 left-0 right-0 h-4 flex justify-between"
          style="background-image: radial-gradient(circle at 50% 100%, white 25%, transparent 25%), radial-gradient(circle at 50% 100%, white 25%, transparent 25%); background-size: 20px 20px; background-position: 0 0, 10px 10px;"
        ></div>
      </div>
    </main>
  `,
  styleUrl: './ticket.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketComponent {
  eventService = inject(EventService);
  ticketService = inject(TicketService);
  route = inject(ActivatedRoute);
  ticket = signal<ITicket | null>(null);
  event = signal<Event | null>(null);

 ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  const id = Number(idParam);

  if (isNaN(id)) return;

  this.ticketService.getTicketById(id).pipe(
    tap(ticket => {
      if (ticket) this.ticket.set(ticket);
    }),
    switchMap(ticket => {
      const eventId = ticket?.ticketType?.eventoId;
      return eventId ? this.eventService.getEvent(eventId) : of(null);
    })
  ).subscribe(event => {
    if (event) this.event.set(event);
  });
  }

  formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleDateString('pt-PT', options);
  }

  printTicket() {
    window.print();
  }
}
