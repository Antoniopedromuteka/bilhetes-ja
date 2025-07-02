import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../../app/core/services/category.service';
import { AuthService, ListUser } from '../../../../../app/core/services/auth.service';
import { Category } from '../../../../../domain/models/category';
import { EventService, registerEventPayload } from '../../../../../app/core/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../../app/core/services/toast.service';

const COMPONENTS = [BreadcrumbComponent];

@Component({
  selector: 'app-new',
  imports: [...COMPONENTS, ReactiveFormsModule],
  template: `
    <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    <div class="mt-5">
      <h2 class="font-medium text-xl">Novo evento</h2>
    </div>
    <section class="w-full   h-auto bg-white mt-5 rounded-md p-6">
      <h3 class="text-xl font-medium">Informações gerais</h3>
      <form
        [formGroup]="formEvent"
        (ngSubmit)="onSubmit()"
        class="flex flex-col gap-4 mt-5"
      >
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nome do evento</label
            >
            <input
              type="text"
              name="name"
              id="name"
              formControlName="name"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formEvent.get('name')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Local</label
            >
            <input
              type="text"
              name="local"
              id="local"
              formControlName="local"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formEvent.get('local')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
        </div>
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Categoria</label
            >
            <select
              formControlName="categoryId"
              name="categoryId"
              id="categoryId"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            >
              @for(category of categories(); track $index){
                <option value="{{category.id}}">{{category.nome}}</option>
              }
            </select>
            @if(submitted() && formEvent.get('categoryId')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Lotação</label
            >
            <input
              type="number"
              name="lotation"
              id="lotation"
              formControlName="lotation"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formEvent.get('lotation')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
          </div>
        </div>
        <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Data do Evento</label
            >
            <input
              type="datetime-local"
              [min]="getCurrentDateTimeISO()"
              name="dataEvento"
              id="dataEvento"
              formControlName="dataEvento"
              class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2"
            />
            @if(submitted() && formEvent.get('dataEvento')?.invalid){
              <span class="text-sm text-red-500">Campo obrigatorio</span>
            }
        </div>
        <div class="w-full flex flex-col gap-1">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Descrição</label
          >
          <textarea
            name="description"
            id="description"
            formControlName="description"
            class="w-full pt-2 h-32 rounded-md bg-gray-100 focus:outline-1 px-2 resize-none"
          ></textarea>
          @if(submitted() && formEvent.get('description')?.invalid){
            <span class="text-sm text-red-500">Campo obrigatorio</span>
          }
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
  styleUrl: './new.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  formEvent: FormGroup;
  submitted = signal<boolean>(false);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  authService = inject(AuthService);
  eventService = inject(EventService);
  toastService = inject(ToastService);
  categories = signal<Category[] | null>(null);
  user = signal<ListUser | null>(null);
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Eventos',
        url: '/dashboard/events',
      },
      {
        label: 'Criar',
        url: '/dashboard/events/new',
      },
    ],
  };

  constructor(){
    this.formEvent = this.fb.group({
      name: ['', Validators.required],
      local: ['', Validators.required],
      categoryId: ['', Validators.required],
      lotation: ['', Validators.required],
      dataEvento: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories.set(response);
    });
    this.authService.usersMe().subscribe((response) => {
      this.user.set(response);
    });
  }

  getCurrentDateTimeISO() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
    return formattedDate;
  }

  onSubmit(): void {
    this.submitted.set(true);
    if(this.formEvent.invalid){
      return;
    }
    console.log(this.formEvent.value, "meudados");
    const formData: registerEventPayload = {
      nome: this.formEvent.get('name')?.value,
      descricao: this.formEvent.get('description')?.value,
      categoriaId: parseInt(this.formEvent.get('categoryId')?.value),
      local: this.formEvent.get('local')?.value,
      dataEvento: this.formEvent.get('dataEvento')?.value,
      lotacaoTotal: parseInt(this.formEvent.get('lotation')?.value),
      organizadorId: this.user()!.id,
      imagemId: null
    }

    this.eventService.createEvent(formData).subscribe({
      next: (response) => {
        this.toastService.success('Evento cadastrado com sucesso.');
        this.router.navigate(['/dashboard/events']);
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
