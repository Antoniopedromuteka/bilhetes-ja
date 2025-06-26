import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';

const COMPONENTS = [BreadcrumbComponent];
@Component({
  selector: 'app-edit',
  imports: [...COMPONENTS],
  template: `
    <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    <div class="mt-5">
      <h2 class="font-medium text-xl">Editar evento</h2>
    </div>
    <section class="w-full   h-auto bg-white mt-5 rounded-md p-6">
      <h3 class="text-xl font-medium">Informações gerais</h3>
      <form class="flex flex-col gap-4 mt-5">
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700">Nome do evento</label>
            <input type="text" name="name" id="name" class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
          </div>
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700">Local</label>
            <input type="text" name="name" id="name" class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700">Categoria</label>
            <select class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2">
              <option value="1">Futebol</option>
            </select>
          </div>
          <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700">Lotação</label>
            <input type="text" name="name" id="name" class="w-full  h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
          </div>
        </div>
        <div class="w-full flex flex-col gap-1">
            <label for="name" class="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea class="w-full h-32 rounded-md bg-gray-100 focus:outline-1 px-2 resize-none"></textarea>
        </div>
        <div class="w-full flex justify-end ">
          <button class="w-full max-w-[100px] cursor-pointer h-10 rounded-md bg-primary text-white font-medium">Salvar</button>
        </div>
      </form>
    </section>
  `,
  styleUrl: './edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Eventos',
        url: '/dashboard/events',
      },
      {
        label: 'Editar',
        url: '/dashboard/events/update',
      },
    ],
  };
}
