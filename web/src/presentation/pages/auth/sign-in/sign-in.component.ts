import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink],
  template: ` <main
    class="w-full max-h-screen h-full py-10 xl:py-20 mt-[64px] bg-gray-100 px-3 xl:px-0"
  >
    <section class="max-h-screen h-[900px] w-full">
      <form
        action=""
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
            <div routerLink="/auth/reset-password">
              <span class="text-primary font-medium cursor-pointer text-sm"
                >Esqueci minha senha</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <button
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
export class SignInComponent {}
