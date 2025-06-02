import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService, RegisterPayload } from "../../../../app/core/services/auth.service";
import { ToastService } from "../../../../app/core/services/toast.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TokenService } from "../../../../app/core/services/token.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
  <main class="w-full min-h-screen h-auto py-10 xl:py-20 mt-[64px] bg-gray-100 px-3 xl:px-0">
    <section class="max-h-screen min-h-[900px] h-auto w-full">
      <form
        [formGroup]="signUpForm"
        (ngSubmit)="onSubmit()"
        class="md:max-w-[500px] flex flex-col mx-auto h-auto bg-white rounded-md w-full p-8 space-y-4"
      >
        <div>
          <h3 class="text-2xl font-medium text-slate-700">Crie sua conta Agora!</h3>
        </div>
        <section class="space-y-3 h-auto">
          <div>
            <label for="name">Nome</label>
            <input type="text" id="name" formControlName="name" class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" placeholder="Insira seu nome"/>
            @if(submitted && signUpForm.get('name')?.invalid){
              <div class="text-red-500 text-sm">Nome é obrigatório</div>
            }
          </div>

          <div>
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email" class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" placeholder="Insira seu email"/>
            @if(submitted && signUpForm.get('email')?.invalid && signUpForm.get('email')?.touched){
                <div class="text-red-500 text-sm">O email é inválido</div>
            }
          </div>

          <div>
            <label for="password">Senha</label>
            <input type="password" id="password" formControlName="password" class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" placeholder="Insira sua senha"/>
            @if(submitted && signUpForm.get('password')?.invalid){
              <div class="text-red-500 text-sm">Senha é obrigatória</div>
            }
          </div>

          <div>
            <label for="confirmPassword">Confirmar Senha</label>
            <input type="password" id="confirmPassword" formControlName="confirmPassword" class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" placeholder="Confirme sua senha"/>
            @if(submitted && signUpForm.get('confirmPassword')?.invalid){
              <div class="text-red-500 text-sm">Confirmação obrigatória</div>
            }
            @if(submitted && signUpForm.get('confirmPassword')?.value !== signUpForm.get('password')?.value){
                <div class="text-red-500 text-sm">As senhas devem ser iguais</div>
            }
          </div>

          <div>
            <div class="flex items-center gap-2">
            <input type="checkbox" id="terms" formControlName="terms" />
            <label class="text-sm text-slate-600 font-medium" for="terms">Aceito os Termos de Uso</label>
            </div>
            @if(submitted && !signUpForm.get('terms')?.value){
              <div class="text-red-500 text-sm">Você deve aceitar os termos</div>
            }
          </div>
          <div class="flex w-full flex-col gap-1">
            <button [disabled]="submitted" type="submit" class="w-full bg-primary text-white py-2 mt-4 rounded-md cursor-pointer">
              Registrar
            </button>
            <div class="flex justify-end items-center gap-1">
              <span>Já possui uma conta?</span>
              <span routerLink="/auth/sign-in" class="text-primary cursor-pointer">Login</span>
            </div>
          </div>
        </section>
      </form>
    </section>
  </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitted = false;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private tokenService = inject(TokenService);

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
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    const formData: RegisterPayload = {
      nome: this.signUpForm.get('name')?.value,
      email: this.signUpForm.get('email')?.value,
      senha: this.signUpForm.get('password')?.value
    }

    this.authService.registerUser(formData).subscribe({
      next: (response) => {
        this.toastService.success('Cadastro realizado com sucesso.');
        this.tokenService.saveToken(response.token)
        this.signUpForm.reset();
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['/dashboard/events']);
        }, 1000)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        const errorMessage = error.error?.Mensagem || "Erro ao realizar o cadastro.!";
        this.toastService.error(errorMessage);
        this.submitted = false;
      }
    });
  }

}
