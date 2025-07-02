import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from '../../../../../app/core/services/event.service';
import { AuthService } from '../../../../../app/core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { TableComponent } from '../../../../components/table/table.component';
import { catchError, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Event, ticket } from '../../../../../domain/models/event';
import { TicketTypeService } from '../../../../../app/core/services/ticketType.service';
import { ModalDeleteComponent } from '../../../../components/modalDelete/modalDelete.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../../app/core/services/toast.service';

const COMPONENTS = [
  BreadcrumbComponent,
  TableComponent,
  ModalDeleteComponent
];

@Component({
  selector: 'app-tickets',
  imports: [...COMPONENTS, RouterLink],
  template: `
    @if(showModal()){
      <app-modal-delete description="Tem certeza que deseja eliminar o bilhete ({{ ticket()?.nome }})?" (closeModal)="this.showModal.set(false)" (confirmDelete)="handleConfirmDelete()"/>
    }
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-xl font-medium">Bilhetes ({{ event()?.nome }}) </h2>
        </div>
        <div class="w-full flex justify-end">
          <button
            class="bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:brightness-90"
            routerLink="/dashboard/events/{{ event()?.id }}/tickets/new"
          >
            Criar bilhete
          </button>
        </div>
        <section class="w-full h-auto mt-5">
          <app-table
            [data]="ticketTypes()"
            [columns]="[
              { key: 'nome', header: 'Nome' },
              { key: 'preco', header: 'Preço' },
              { key: 'quantidade', header: 'Quatidade' },
              { key: 'eventoNome', header: 'Evento' },
              { key: 'actions', header: 'Ações', custom: actions }
            ]"
            [pageSize]="10"
          >
            <ng-template #actions let-event>
              <div class="flex gap-1">
                <button (click)="deleteEvent(event)" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
                <button (click)="editEvent(event)" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                </button>
                <!-- <button routerLink="/dashboard/events/{{event.id}}/tickets" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tickets-icon lucide-tickets"><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>
                </button> -->
              </div>
            </ng-template>
          </app-table>
        </section>
      </section>
    </main>
  `,
  styleUrl: './tickets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent {
  private readonly destroyRef = inject(DestroyRef);
  showModal = signal(false);
  @ViewChild('actions') actionsTemplate!: TemplateRef<any>;
  ticketTypeService = inject(TicketTypeService);
  ticket = signal<ticket | null>(null);
  eventService = inject(EventService);
  event = signal<Event | null>(null);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);

  ticketTypes = signal<ticket[]>([]);
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [{ label: 'Eventos', url: '/dashboard/events' }, {
      label: 'Bilhetes',
      url: '/dashboard/events/tickets',
    }],
  };

  ngOnInit() {
    let eventId = Number(this.route.snapshot.paramMap.get('id'));

    this.eventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.event.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.ticketTypeService.getByEvendId(eventId).subscribe({
      next: (response) => {
        this.ticketTypes.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    })

  }

  formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(date).toLocaleDateString('pt-PT', options);
  }

  editEvent(event: ticket) {
    this.router.navigate([`/dashboard/events/${this.event()?.id}/tickets/update/${event.id}`]);
  }

  deleteEvent(t: ticket) {
    this.showModal.set(true);
    this.ticket.set(t);
  }

  handleConfirmDelete(){
    this.ticketTypeService.deleteTicketType(this.ticket()!.id).subscribe({
      next: (response) => {
        this.toastService.success('Bilhete excluído com sucesso.');
        this.router.navigate([`/dashboard/events/${this.event()?.id}/tickets`]);
        this.ticketTypes.set(this.ticketTypes().filter(t => t.id !== this.ticket()!.id));
        this.showModal.set(false);
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.Mensagem || "Erro ao realizar o cadastro.!";
        this.toastService.error(errorMessage);
      }
    })
  }
}
