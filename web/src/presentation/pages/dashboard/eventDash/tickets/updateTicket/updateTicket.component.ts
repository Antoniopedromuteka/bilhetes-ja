import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../../app/core/services/category.service';
import { AuthService, ListUser } from '../../../../../../app/core/services/auth.service';
import { EventService } from '../../../../../../app/core/services/event.service';
import { ToastService } from '../../../../../../app/core/services/toast.service';
import { registerTicketType, TicketTypeService } from '../../../../../../app/core/services/ticketType.service';
import { Category } from '../../../../../../domain/models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbComponent } from '../../../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [BreadcrumbComponent];

@Component({
  selector: 'app-update-ticket',
  imports: [...COMPONENTS, ReactiveFormsModule],
  template: `
    <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    <div class="mt-5">
      <h2 class="font-medium text-xl">Editar bilhete</h2>
    </div>
    <section class="w-full   h-auto bg-white mt-5 rounded-md p-6">
      <h3 class="text-xl font-medium">Informações gerais</h3>
      <form
        [formGroup]="formTicketType"
        (ngSubmit)="onSubmit()"
        class="flex flex-col gap-4 mt-5"
      >
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nome do bilhete</label
            >
            <input
              type="text"
              name="nome"
              id="nome"
              formControlName="nome"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formTicketType.get('name')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Preço</label
            >
            <input
              type="text"
              name="preco"
              id="preco"
              formControlName="preco"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formTicketType.get('local')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
        </div>
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Quantidade</label
            >
            <input
              type="number"
              name="quantidade"
              id="quantidade"
              formControlName="quantidade"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formTicketType.get('lotation')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
        </div>
        <div class="w-full flex justify-end ">
          <button
            type="submit"
            [disabled]="submitted()"
            class="w-full max-w-[100px] cursor-pointer h-10 rounded-md bg-primary text-white font-medium"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  `,
  styleUrl: './updateTicket.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTicketComponent {
  formTicketType: FormGroup;
  submitted = signal<boolean>(false);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  eventService = inject(EventService);
  toastService = inject(ToastService);
  ticketTypeService = inject(TicketTypeService);
  route = inject(ActivatedRoute);
  categories = signal<Category[] | null>(null);
  user = signal<ListUser | null>(null);
  eventId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));
  ticketTypeId = signal<number>(Number(this.route.snapshot.paramMap.get('ticketTypeId')));
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Eventos',
        url: '/dashboard/events',
      },
      {
        label: 'Bilhetes',
        url: `/dashboard/events/${this.eventId()}/tickets`,
      },
      {
        label: 'Editar',
        url: `/dashboard/events/${this.eventId()}/tickets/update/${this.ticketTypeId()}`,
      },
    ],
  };

  constructor(){
    this.formTicketType = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      quantidade: ['', Validators.required],
    })
  }

  ngOnInit(): void{
    this.ticketTypeService.getById(this.ticketTypeId()).subscribe({
      next: (response) => {
        this.formTicketType.get('nome')?.setValue(response.nome);
        this.formTicketType.get('preco')?.setValue(response.preco);
        this.formTicketType.get('quantidade')?.setValue(response.quantidade);
      }
    })
  }

  onSubmit(): void {
    this.submitted.set(true);
    if(this.formTicketType.invalid){
      return;
    }
    const formData: registerTicketType = {
      nome: this.formTicketType.get('nome')?.value,
      preco: Number(this.formTicketType.get('preco')?.value),
      quantidade: Number(this.formTicketType.get('quantidade')?.value),
      eventoId: Number(this.eventId()),
      id: Number(this.ticketTypeId())
    }

    this.ticketTypeService.updateTicketType(formData).subscribe({
      next: (response) => {
        this.toastService.success('Bilhete atualizado com sucesso!');
        this.router.navigate([`/dashboard/events/${this.eventId()}/tickets`]);
        this.submitted.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        const errorMessage = error.error?.Mensagem || "Erro ao realizar o cadastro.!";
        this.toastService.error(errorMessage);
        this.submitted.set(false);
      }
    });
  }
}
