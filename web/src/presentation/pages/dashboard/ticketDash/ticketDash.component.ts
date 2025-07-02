import { ChangeDetectionStrategy, Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { Event } from '../../../../domain/models/event';
import { EventService } from '../../../../app/core/services/event.service';
import { CardEventComponent } from '../../../components/cardEvent/cardEvent.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITicket, TicketService } from '../../../../app/core/services/ticket.service';
import { FormatMoneyService } from '../../../../app/core/services/formatMoney.service';
import { LoaderService } from '../../../../app/core/services/loader.service';
import { ToastService } from '../../../../app/core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TableComponent } from '../../../components/table/table.component';
import { AuthService, ListUser } from '../../../../app/core/services/auth.service';
import { finalize, switchMap } from 'rxjs';

const COMPONENTS = [
  BreadcrumbComponent,
  TableComponent
];

@Component({
  selector: 'app-ticket-dash',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-2xl font-medium">Bilhetes Comprados</h2>
        </div>
        <div class="w-full flex justify-end"></div>
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
                <button routerLink="/ticket/{{ ticket.id }}" class="bg-primary hover:bg-purple-600 cursor-pointer text-white py-2 px-2 rounded-md">
                  ver ticket
                </button>
              </div>
            </ng-template>
          </app-table>
        </section>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDashComponent {
  events = signal<Event[]>([]);
  eventService = inject(EventService)
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Meus blihetes',
        url: '/dashboard/tickets',
      },
    ],
  };
  authService = inject(AuthService);
  private readonly ticketService = inject(TicketService);
  formatMoney = inject(FormatMoneyService);
  route = inject(ActivatedRoute);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  showModal = signal(false);
  @ViewChild('actions') actionsTemplate!: TemplateRef<any>;
  router = inject(Router);
  tickets = signal<ITicket[]>([]);

  ngOnInit() {
  this.loaderService.show();

  this.authService.usersMe().pipe(
    switchMap(user => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado ou ID inválido');
      }
      return this.ticketService.getByUserId(user.id);
    }),
    finalize(() => this.loaderService.hide())
  ).subscribe({
    next: tickets => {
      this.tickets.set(
        tickets.map(ticket => ({
          ...ticket,
          dataCompra: this.formatDate(ticket.dataCompra),
          statusBilhete: ticket.status,
          nomeUsuario: ticket.usuario?.nome || 'Anônimo',
          preco: ticket.ticketType?.preco
            ? this.formatMoney.formatEuro(ticket.ticketType.preco)
            : '0,00 €',
          nomeBilhete: ticket.ticketType?.nome || 'Bilhete sem nome',
        }))
      );
    },
    error: err => {
      console.error('Erro ao carregar tickets:', err);
    }
  });
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

}
