import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HOW_CREATE_EVENT_MOCKS } from '../../../lib/mocks/howCreateEvent';
import { MatExpansionModule } from '@angular/material/expansion';
import { FAQS_MOCKS } from '../../../lib/mocks/faqs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  RegisterPayload,
} from '../../../app/core/services/auth.service';
import { ToastService } from '../../../app/core/services/toast.service';
import { TokenService } from '../../../app/core/services/token.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
const MODULES = [MatExpansionModule, ReactiveFormsModule];

@Component({
  selector: 'app-create-event',
  imports: [...MODULES],
  template: `
    <main class="w-full min-h-screen h-[calc(100vh - 64px)] mt-[64px]">
      <section
        class="w-full xl:h-[30rem] h-auto bg-primary px-3 xl:px-0 py-10 lg:py-0"
      >
        <div
          class="xl:max-w-[1280px] mx-auto w-full h-auto flex lg:flex-row flex-col items-center justify-between pt-10 xl:pt-30"
        >
          <div class="flex flex-col gap-6 h-full pb-20">
            <h2 class="text-4xl font-bold text-white">Crie um Evento</h2>
            <span class="font-light text-xl text-slate-200"
              >venda ingressos on-line!</span
            >

            <ul class="flex flex-col gap-2 text-white text-base mt-3">
              <li class="flex items-center gap-2">
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
                  class="lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <label for="">Sem complicações</label>
              </li>
              <li class="flex items-center gap-2">
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
                  class="lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <label for="">Alcance mais compradores</label>
              </li>
              <li class="flex items-center gap-2">
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
                  class="lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <label for="">Suporte dedicado 24/7</label>
              </li>
            </ul>
            <span class="font-400 text-sm text-slate-200"
              >Pagamento On-line Seguro: via stripe</span
            >
          </div>
          <div
            class="relative w-full xl:w-[30rem] h-auto bg-white px-10 py-16 border border-slate-200 shadow-lg rounded-3xl"
          >
            <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
              <div class="flex flex-col gap-0.5">
                <input
                  type="text"
                  class="border rounded-md  border-gray-400 outline-none bg-gray-50  py-2 px-2"
                  placeholder="Nome"
                  formControlName="name"
                />
                @if(submitted() && signUpForm.get('name')?.errors){
                <span class="text-red-500 text-sm"> O nome é obrigatório </span>
                }
              </div>
              <div class="flex flex-col gap-0.5">
                <input
                  type="email"
                  class="border rounded-md border-gray-400 outline-none bg-gray-50  py-2 px-2"
                  placeholder="E-mail"
                  formControlName="email"
                />
                @if(submitted() && signUpForm.get('email')?.errors){
                <span class="text-red-500 text-sm">
                  O e-mail é obrigatório
                </span>
                }
              </div>
              <div class="flex flex-col gap-0.5">
                <input
                  type="password"
                  class="border rounded-md border-gray-400 outline-none bg-gray-50  py-2 px-2"
                  placeholder="Senha"
                  formControlName="password"
                />
                @if(submitted() && signUpForm.get('password')?.errors){
                <span class="text-red-500 text-sm">
                  A senha é obrigatória
                </span>
                }
              </div>
              <div class="flex flex-col gap-0.5">
                <input
                  type="password"
                  class="border rounded-md border-gray-400 outline-none bg-gray-50  py-2 px-2"
                  placeholder="Confirmar Senha"
                  formControlName="confirmPassword"
                />
                @if(submitted() && signUpForm.get('confirmPassword')?.invalid){
                <div class="text-red-500 text-sm">Confirmação obrigatória</div>
                } @if(submitted() && signUpForm.get('confirmPassword')?.value !==
                signUpForm.get('password')?.value){
                <div class="text-red-500 text-sm">
                  As senhas devem ser iguais
                </div>
                }
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" formControlName="terms" />
                <label class="text-sm text-slate-600 font-medium" for="check"
                  >Aceito os Termos de Uso</label
                >
              </div>
              @if(submitted() && !signUpForm.get('terms')?.value){
                <span class="text-red-500 text-sm">Você deve aceitar os termos</span>
              }
              <button
                type="submit"
                class="bg-primary text-white py-2 hover:brightness-90 rounded-md cursor-pointer"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </section>
      <section class="w-full h-auto bg-gray-100">
        <div class="max-w-[1280px] mx-auto w-full h-auto">
          <h3
            class="xl:text-4xl text-2xl font-bold text-primary text-center pt-10 xl:pt-40"
          >
            Como Vender Ingressos na BilheteJa?
          </h3>
          <section
            class="max-w-[1280px] mx-auto w-full h-auto py-10 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
          >
            @for(item of howCreateEventMocks; track $index){
            <div
              class="p-5 w-full h-[15rem] hover:border-b-2 hover:border-primary hover:shadow-lg hover:scale-95 hover:duration-200 cursor-pointer flex flex-col gap-8"
            >
              <div
                class="p-3 max-w-[4rem] bg-primary flex justify-center items-center rounded-xl text-white"
              >
                <span [innerHTML]="sanitizeIcon(item.icon)"></span>
              </div>
              <div class="flex flex-col gap-3">
                <h4 class="text-xl font-medium">{{ item.title }}</h4>
                <p class="text-slate-400">
                  {{ item.description }}
                </p>
              </div>
            </div>
            }
          </section>
        </div>
      </section>
      <section class="w-full h-auto max-w-[1280px] mx-auto py-10 px-3 xl:px-0">
        <div
          class="w-full h-auto flex flex-col items-center py-10 space-y-3 xl:space-y-5"
        >
          <div class="px-5 py-3 rounded-md font-extralight bg-gray-100">
            <h3>FAQS</h3>
          </div>
          <p class="text-4xl font-bold text-primary">Perguntas Frequentes</p>
        </div>

        <section class="max-w-[1000px] mx-auto">
          @for(item of faqsMocks; track $index){
          <mat-expansion-panel
            class="shadow-none! rounded-md! h-auto my-1! xl:my-3!"
          >
            <mat-expansion-panel-header class="py-3">
              {{ item.question }}
            </mat-expansion-panel-header>

            <ng-template matExpansionPanelContent class="">
              @for(item of item.answers; track $index){
              <div class="flex flex-col gap-4">
                <span>{{ item }}</span>
              </div>
              }
            </ng-template>
          </mat-expansion-panel>
          }
        </section>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent {
  signUpForm: FormGroup;
  public readonly howCreateEventMocks = HOW_CREATE_EVENT_MOCKS;
  public readonly faqsMocks = FAQS_MOCKS;
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);
  submitted = signal<boolean>(false);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  constructor() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.signUpForm.invalid) {
      return;
    }

    const formData: RegisterPayload = {
      nome: this.signUpForm.get('name')?.value,
      email: this.signUpForm.get('email')?.value,
      senha: this.signUpForm.get('password')?.value,
    };

    this.authService.registerUser(formData).subscribe({
      next: (response) => {
        this.submitted.set(false);
        this.tokenService.saveToken(response.token);
        this.signUpForm.reset();
        this.toastService.success('Cadastro realizado com sucesso.');
        setTimeout(() => {
          this.router.navigate(['/dashboard/events']);
        }, 1000)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        const errorMessage =
          error.error?.Mensagem || 'Erro ao realizar o cadastro.!';
        this.toastService.error(errorMessage);
        this.submitted.set(false);
      },
    });
  }

  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
