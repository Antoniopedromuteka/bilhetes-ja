import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../../app/core/services/toast.service';
import { LoaderService } from '../../../../../app/core/services/loader.service';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { TableComponent } from '../../../../components/table/table.component';
import { Event } from '../../../../../domain/models/event';
import {
  ITicket,
  TicketService,
} from '../../../../../app/core/services/ticket.service';
import { FormatMoneyService } from '../../../../../app/core/services/formatMoney.service';
import { EventService } from '../../../../../app/core/services/event.service';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

const COMPONENTS = [BreadcrumbComponent, TableComponent, QrScannerComponent];

@Component({
  selector: 'app-tickets-sold',
  imports: [...COMPONENTS],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      @if(scannerVisible()){
      <app-qr-scanner
        (scanned)="handleScannedResult($event)"
        (closed)="closeScanner()"
      />
      }
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-2xl font-medium">
            Bilhetes Vendidos do Evento ({{ event()?.nome }})
          </h2>
        </div>
        <div class="w-full flex justify-end">
          <button
            (click)="openScanner()"
            class="cursor-pointer border px-4 py-2 rounded-md bg-primary text-white"
          >
            Validar
          </button>
        </div>
        <section class="w-full h-auto mt-5">
          <app-table
            [data]="tickets()"
            [columns]="[
              { key: 'nomeBilhete', header: 'Nome do Bilhete' },
              { key: 'preco', header: 'Preço' },
              { key: 'nomeUsuario', header: 'Usuário' },
              { key: 'dataCompra', header: 'Data da Compra' },
              { key: 'statusBilhete', header: 'Estado' },
              { key: 'actions', header: 'Ações', custom: actions }
            ]"
            [pageSize]="10"
          >
            <ng-template #actions let-ticket>
              <div class="flex gap-1">
                <button
                  (click)="handleApprove(ticket)"
                  class="cursor-pointer border p-2 rounded-md bg-primary text-white"
                >
                  Aprovar
                </button>
                <button
                  (click)="handleCancel(ticket)"
                  class="border p-2 rounded-md cursor-pointer bg-red-400 text-white"
                >
                  Cancelar
                </button>
              </div>
            </ng-template>
          </app-table>
        </section>
      </section>
    </main>
  `,
  styleUrl: './ticketsSold.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsSoldComponent {
  private readonly ticketService = inject(TicketService);
  formatMoney = inject(FormatMoneyService);
  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  loaderService = inject(LoaderService);
  event = signal<Event | null>(null);
  eventId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));
  toastService = inject(ToastService);
  showModal = signal(false);
  @ViewChild('actions') actionsTemplate!: TemplateRef<any>;
  router = inject(Router);

  tickets = signal<ITicket[]>([]);
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      { label: 'Eventos', url: '/dashboard/events' },
      {
        label: 'Bilhetes Vendidos',
        url: `/dashboard/events/${this.eventId()}/ticketsSold`,
      },
    ],
  };

  scannerVisible = signal(false);

  openScanner() {
    this.scannerVisible.set(true);
  }

  closeScanner() {
    this.scannerVisible.set(false);
  }

  handleScannedResult(result: string) {
    this.closeScanner();
    // Aqui você pode chamar seu serviço com o resultado escaneado
    // this.ticketService.validateTicketByQr(result).subscribe({
    //   next: () => {
    //     this.toastService.success('Bilhete validado com sucesso via QR!');
    //     window.location.reload();
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     const errorMessage = error.error?.Mensagem || 'Erro ao validar o ticket!';
    //     this.toastService.error(errorMessage);
    //   },
    // });
  }

  ngOnInit() {
    this.loaderService.show();
    this.eventService.getEventById(this.eventId()).subscribe((event) => {
      this.event.set(event);
    });
    this.ticketService
      .getTicketsByEventId(this.eventId())
      .subscribe((tickets) => {
        this.tickets.set(
          tickets.map((ticket) => {
            return {
              ...ticket,
              dataCompra: this.formatDate(ticket.dataCompra),
              statusBilhete: ticket.status,
              nomeUsuario: ticket.usuario.nome || 'Anonimo',
              preco: this.formatMoney.formatEuro(ticket.ticketType.preco),
              nomeBilhete: ticket.ticketType.nome,
            };
          })
        );
      });
    this.loaderService.hide();
  }

  formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(date).toLocaleDateString('pt-PT', options);
  }

  editEvent(event: Event) {
    this.router.navigate([`/dashboard/events/update/${event.id}`]);
  }

  deleteEvent(event: Event) {
    this.event.set(event);
    this.showModal.set(true);
  }

  handleApprove(ticket: ITicket) {
    this.ticketService.validateTicket(ticket.id).subscribe({
      next: (response) => {
        this.toastService.success('Bilhete aprovado com sucesso.');
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage =
          error.error?.Mensagem || 'Erro ao aprovar o ticket!';
        this.toastService.error(errorMessage);
      },
    });
  }

  handleCancel(ticket: ITicket) {
    this.ticketService.cancelTicket(ticket.id).subscribe({
      next: (response) => {
        this.toastService.success('Bilhete cancelado com sucesso.');
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage =
          error.error?.Mensagem || 'Erro ao cancelar o ticket!';
        this.toastService.error(errorMessage);
      },
    });
  }
}
