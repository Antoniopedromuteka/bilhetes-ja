import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardEventComponent } from '../../components/cardEvent/cardEvent.component';
import {MatPaginatorModule} from '@angular/material/paginator';

const MODULES = [MatPaginatorModule];
const COMPONENTS = [CardEventComponent];

@Component({
  selector: 'app-event',
  imports: [...COMPONENTS, ...MODULES],
  template: `<main class="w-full h-[calc(100vh-64px)] h-auto mt-[64px]">
    <section
      class="w-full max-w-[1280px] px-3 h-auto xl:px-0 mx-auto py-10"
    >
    <div class="w-full flex items-center justify-between mt-10">
      <h3 class="text-3xl font-semibold">Próximos Eventos</h3>
      <div class="text-slate-500 text-lg">
        6 eventos encontrados
      </div>
    </div>
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
    <main class="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-auto">
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
      <app-card-event />
    </main>
    <div class="mt-10">
      <mat-paginator [length]="100" [pageIndex]="0" [pageSize]="10" (page)="onPageChange($event)"></mat-paginator>
    </div>
  </section>
  </main> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {

  onPageChange(event: any) {
    console.log('Page changed to: ', event.pageIndex);
    console.log('Number of items per page: ', event.pageSize);
  }
}
