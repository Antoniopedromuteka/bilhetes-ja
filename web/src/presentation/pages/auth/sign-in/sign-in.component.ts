import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginPayload } from '../../../../app/core/services/auth.service';
import { ToastService } from '../../../../app/core/services/toast.service';
import { TokenService } from '../../../../app/core/services/token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  template: ` <main
    class="w-full max-h-screen h-full py-10 xl:py-20 mt-[64px] bg-gray-100 px-3 xl:px-0"
  >
    <section class="max-h-screen h-[900px] w-full">
      <form
        [formGroup]="signInForm"
        (ngSubmit)="onSubmit()"
        class="md:max-w-[500px] mx-auto h-auto xl:h-[25rem] bg-white rounded-md w-full p-8 space-y-8"
      >
        <div>
          <h3 class="text-2xl font-medium text-slate-700">
            Bem-vindo(a) a BilheteJa
          </h3>
        </div>
        <section class="space-y-4">
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
              placeholder="Insira seu email"
            />
            @if(submitted && signInForm.get('email')?.invalid && signInForm.get('email')?.touched){
                <span class="text-red-500 text-sm">O email é inválido</span>
            }
          </div>
          <div>
            <label for="password">Senha</label>
            <input
              type="password"
              formControlName="senha"
              id="password"
              class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
              placeholder="Insira sua senha"
            />
            <div routerLink="/auth/reset-password">
              <span class="text-primary font-medium cursor-pointer text-sm"
                >Esqueci minha senha</span
              >
            </div>
            @if(submitted && signInForm.get('senha')?.invalid && signInForm.get('senha')?.touched){
                <span class="text-red-500 text-sm">A senha é obrigatória</span>
            }
          </div>
          <div class="flex flex-col gap-1">
            <button
              [disabled]="submitted"
              type="submit"
              class="w-full bg-primary text-white py-2 mt-4 rounded-md cursor-pointer"
            >
              Entrar
            </button>
            <div class="w-full flex justify-end items-center gap-1">
              <span>Não tem uma conta?</span>
              <span
                routerLink="/auth/sign-up"
                class="text-primary font-medium cursor-pointer text-sm self-end"
                >Criar uma conta</span
              >
            </div>
          </div>
        </section>
      </form>
    </section>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  signInForm: FormGroup;
  submitted = false;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private tokenService = inject(TokenService);

  constructor(){
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    const formData: LoginPayload = {
      email: this.signInForm.get('email')?.value,
      senha: this.signInForm.get('senha')?.value
    }

    this.authService.login(formData).subscribe({
      next: (response) => {
        this.toastService.success('Login realizado com sucesso.');
        this.tokenService.saveToken(response.token)
        this.signInForm.reset();
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['/dashboard/events']);
        }, 1000)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        const errorMessage = error.error?.Mensagem || "Erro ao realizar o login.!";
        this.toastService.error(errorMessage);
      }
    });
  }

}
