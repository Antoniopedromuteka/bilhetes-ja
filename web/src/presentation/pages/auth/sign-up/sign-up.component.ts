import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  template: ` <main
    class="w-full max-h-screen h-full py-10 xl:py-20 mt-[64px] bg-gray-100 px-3 xl:px-0"
  >
    <section class="max-h-screen h-[900px] w-full">
      <form
        action=""
        class="md:max-w-[500px] mx-auto h-auto bg-white rounded-md w-full p-8 space-y-6"
      >
        <div>
          <h3 class="text-2xl font-medium text-slate-700">
            Crie sua conta Agora!
          </h3>
        </div>
        <section class="space-y-4">
          <div>
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2" placeholder="Insira seu nome"/>
          </div>
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
              placeholder="Insira seu email"
            />
          </div>
          <div>
            <label for="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
              placeholder="Insira sua senha"
            />
          </div>
          <div>
            <label for="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
              placeholder="Confirme sua senha"
            />
          </div>
          <div class="flex items-center gap-2">
          <input type="checkbox" name="" id="check" />
                <label class="text-sm text-slate-600 font-medium" for="check"
                  >Aceito os Termos de Uso</label
                >
          </div>
          <div class="flex w-full flex-col gap-1">
          <button
            type="submit"
            class="w-full bg-primary text-white py-2 mt-4 rounded-md cursor-pointer"
          >
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
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {}
