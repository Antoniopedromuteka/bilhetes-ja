import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-settings',
  imports: [...COMPONENTS],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-4">
          <h2 class="text-2xl font-medium">Meus dados</h2>
        </div>
        <section class="w-full grid grid-cols-1 lg:grid-cols-3  gap-6 mt-5">
          <div class="col-span-1 border h-40 bg-white flex items-center px-5 rounded-md">
            <div class="w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center">
              <span class="text-gray-950">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              </span>
            </div>
          </div>
          <div class="col-span-1 lg:col-span-2 p-6 border bg-white rounded-md h-[20rem] flex flex-col justify-between gap-2">
            <h2 class="text-xl font-medium">Dados pesooais</h2>
            <div class="flex w-full items-center gap-2 mt-2">
              <div class="w-full flex flex-col gap-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" name="name" id="name" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
              </div>
              <div class="w-full flex flex-col gap-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" name="name" id="name" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
              </div>
            </div>
            <div class="w-full flex flex-col gap-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Telefone</label>
                <input type="text" name="name" id="name" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
            </div>

            <div class="max-w-xs w-full">
              <button class="bg-primary text-white w-24 h-10 rounded-md">Salvar</button>
            </div>
          </div>
        </section>
      </section>
      <section class="w-full max-w-[820px] rounded-md ml-auto bg-white h-72 mt-5 p-6 flex justify-between flex-col gap-2">
        <h2 class="text-xl font-medium">Informações de senha</h2>
        <div class="flex gap-2">
        <div class="w-full flex flex-col gap-1">
          <label for="name" class="block text-sm font-medium text-gray-700">Senha Actual</label>
          <input type="password" name="name" id="name" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        <div class="w-full flex flex-col gap-1">
          <label for="name" class="block text-sm font-medium text-gray-700">Nova Senha</label>
          <input type="password" name="name" id="name" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        </div>
        <div class="w-full flex flex-col gap-1">
          <label for="name" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input type="password" name="name" id="name" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        <div class="max-w-xs w-full">
              <button class="bg-primary text-white w-24 h-10 rounded-md">Salvar</button>
        </div>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Configurações',
        url: '/dashboard/profile',
      },
    ],
  };
}
