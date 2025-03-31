import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

const COMPONENTS = [SearchComponent];

@Component({
  selector: 'app-header',
  imports: [...COMPONENTS],
  template: `
    <header
      class="max-w-[1280px] xl:mx-auto px-2 w-full h-[64px] flex items-center justify-between"
    >
      <div class="w-full flex max-w-[200px] items-center gap-2">
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
          class="lucide lucide-ticket h-8 w-8 text-purple-600"
        >
          <path
            d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          ></path>
          <path d="M13 5v2"></path>
          <path d="M13 17v2"></path>
          <path d="M13 11v2"></path>
        </svg>
        <h2 class="text-2xl font-bold">Bilhetes Já</h2>
      </div>
      <div class="w-full flex justify-between xl:justify-end items-center xl:gap-5 gap-3">
        <div class="xl:max-w-[320px] max-w-[70%] w-full">
          <app-search></app-search>
        </div>
          <button class="flex max-w-[170px] w-full items-center gap-2 border py-2 px-4 rounded-md bg-primary text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-user-icon lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Minha conta</span>
          </button>
      </div>
    </header>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
