import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-event',
  imports: [],
  template: `
    <main class="w-full min-h-screen h-[calc(100vh - 64px)] mt-[64px]">
      <section class="w-full h-[30rem] bg-primary">
        <div class="max-w-[1280px] mx-auto w-full h-auto flex items-center justify-between pt-30">
          <div class="flex flex-col gap-6 h-full pb-20">
            <h2 class="text-4xl font-bold text-white">Crie um Evento</h2>
            <span class="font-light text-xl text-slate-200">venda ingressos on-line!</span>

            <ul class="flex flex-col gap-2 text-white text-base mt-3">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <label for="">Sem complicações</label>
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <label for="">Alcance mais compradores</label>
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <label for="">Suporte dedicado 24/7</label>
              </li>
            </ul>
            <span class="font-400 text-sm text-slate-200">Pagamento On-line Seguro: via stripe</span>
          </div>
          <div class="relative w-[30rem] h-auto bg-white px-10 py-16 border border-slate-200 shadow-lg rounded-3xl">
            <form action="" class="flex flex-col gap-5">
              <input type="text" class="border rounded-md border border-gray-400 outline-none bg-gray-50  py-2 px-2" placeholder="Nome" name=""/>
              <input type="email" class="border rounded-md border border-gray-400 outline-none bg-gray-50  py-2 px-2" placeholder="E-mail" name=""/>
              <input type="password" class="border rounded-md border border-gray-400 outline-none bg-gray-50  py-2 px-2" placeholder="Senha" name=""/>
              <input type="password" class="border rounded-md border border-gray-400 outline-none bg-gray-50  py-2 px-2" placeholder="Confirmar Senha" name=""/>
              <div class="flex items-center gap-2">
                <input type="checkbox" name="" id="check" /> <label class="text-sm text-slate-600 font-medium" for="check">Aceito os Termos de Uso</label>
              </div>
              <button class="bg-primary text-white py-2 rounded-sm hover:brightness-90 rounded-md cursor-pointer">Cadastrar</button>
            </form>
          </div>
        </div>
      </section>
      <section class="w-full h-auto bg-gray-100 h-screen">
        <div class="max-w-[1280px] mx-auto w-full h-auto">
          <h3 class="text-4xl font-bold text-primary text-center pt-40">Como Vender Ingressos na Ticket.ao?</h3>
        </div>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent { }
