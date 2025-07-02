import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { TableComponent } from '../../../components/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../../app/core/services/event.service';
import { AuthService } from '../../../../app/core/services/auth.service';
import { Event } from '../../../../domain/models/event';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { ModalDeleteComponent } from '../../../components/modalDelete/modalDelete.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../app/core/services/toast.service';
import { LoaderService } from '../../../../app/core/services/loader.service';

const COMPONENTS = [BreadcrumbComponent, TableComponent, ModalDeleteComponent];

@Component({
  selector: 'app-event-dash',
  imports: [...COMPONENTS, RouterLink],
  template: `
    @if(showModal()){
      <app-modal-delete description="Tem certeza que deseja eliminar o evento ({{ event()?.nome }})?" (closeModal)="this.showModal.set(false)" (confirmDelete)="handleConfirmDelete()"/>
    }
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-5">
          <h2 class="text-2xl font-medium">Meus Eventos</h2>
        </div>
        <div class="w-full flex justify-end">
          <button
            class="bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:brightness-90"
            routerLink="/dashboard/events/new"
          >
            Criar Evento
          </button>
        </div>
        <section class="w-full h-auto mt-5">
          <app-table
            [data]="events()"
            [columns]="[
              { key: 'nome', header: 'Nome' },
              { key: 'nomeCategoria', header: 'Categoria' },
              { key: 'lotacaoTotal', header: 'Lotação' },
              { key: 'local', header: 'Local' },
              { key: 'dataEvento', header: 'Data' },
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
                <button routerLink="/dashboard/events/{{event.id}}/tickets" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tickets-icon lucide-tickets"><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>
                </button>
                <button routerLink="/dashboard/events/{{event.id}}/ticketsSold" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-check-icon lucide-ticket-check"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9 12 2 2 4-4"/></svg>
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
export class EventDashComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly eventService = inject(EventService);
  private readonly userService = inject(AuthService);
  loaderService = inject(LoaderService);
  event = signal<Event | null>(null);
  toastService = inject(ToastService);
  showModal = signal(false);
  @ViewChild('actions') actionsTemplate!: TemplateRef<any>;
  router = inject(Router);

  events = signal<Event[]>([]);
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [{ label: 'Eventos', url: '/dashboard/events' }],
  };

  ngOnInit() {
    this.loaderService.show();
    this.userService
      .usersMe()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => of(null)),
        switchMap((user) => {
          if (!user) return of([]);
          return this.eventService
            .getEventsByUserId(user.id)
            .pipe(catchError(() => of([])));
        })
      )
      .subscribe((events) => {
        this.events.set(events.map((event) => {
          return({
            ...event,
            nomeCategoria: event.categoria?.nome,
            dataEvento: this.formatDate(event.dataEvento)
          })
        }));
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

  handleConfirmDelete() {
    this.eventService.updateEvent({
      ...this.event()!,
      id: this.event()!.id,
      status: 0,
      dataEvento: new Date(this.event()!.dataEvento),
      organizadorId: Number(this.event()!.organizador.id),
    }).subscribe({
      next: (response) => {
        this.toastService.success('Evento excluído com sucesso.');
        this.router.navigate(['/dashboard/events']);
        this.showModal.set(false);
        this.events.set(this.events().filter(e => e.id !== this.event()!.id));
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.Mensagem || "Erro ao realizar o cadastro.!";
        this.toastService.error(errorMessage);
      }
    })
  }
}
