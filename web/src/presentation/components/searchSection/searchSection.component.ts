import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-section',
  imports: [],
  template: `
    <div class="w-full rounded-md bg-gray-100 md:h-[8rem] py-5 h-auto mt-10 flex flex-col md:flex-row items-center px-5 gap-2">
      <input type="search" placeholder="Buscar eventos..." class="border p-3 md:max-w-[400px] w-full outline-none rounded-md border-gray-200 bg-white"/>
      <select name="" id="" class="border p-3 md:max-w-[300px] w-full outline-none rounded-md border-gray-200 bg-white">
        <option value="">Todos os tipos de eventos</option>
        <option value="">Festivais</option>
        <option value="">Congressos</option>
        <option value="">Workshops</option>
        <option value="">Palestras</option>
        <option value="">Minicursos</option>
        <option value="">Convenções</option>
      </select>
      <select name="" id="" class="border p-3 md:max-w-[300px] w-full outline-none rounded-md border-gray-200 bg-white">
        <option value="">Local</option>
        <option value="">Lisboa</option>
        <option value="">Porto</option>
        <option value="">Paris</option>
        <option value="">Berlim</option>
        <option value="">Roma</option>
      </select>
      <div class="flex w-full justify-end">
      <button class="border p-2 bg-primary text-white max-w-[200px] w-full cursor-pointer text-slate-500 text-lg rounded-md">
        <span>Procurar</span>
      </button>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSectionComponent { }
