import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';

const COMPONENTS = [SearchComponent];

@Component({
  selector: 'app-header',
  imports: [...COMPONENTS, RouterLink],
  template: `
    <header
      class="px-2 w-full h-[64px] shadow-md shadow-black-200 fixed top-0 right-0 left-0 w-full bg-white z-50"
    >
      <section
        class="max-w-[1280px] w-full h-full flex items-center justify-between xl:mx-auto"
      >
        <div
          class="w-full flex max-w-[180px] xl:max-w-[200px] items-center gap-2"
        >
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
          <h2 class="text-2xl font-bold cursor-pointer" routerLink="/">BilheteJá</h2>
        </div>
        <div class="w-full flex justify-end items-center xl:gap-5 gap-3">
          <app-search class="hidden md:flex md:flex-1 justify-end" />
          <button
            routerLink="/auth/sign-in"
            class="flex w-[11rem] cursor-pointer xl:max-w-[170px] xl:w-full items-csnter gap-2 border py-2 px-6 rounded-md bg-primary text-white"
          >
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
      </section>
    </header>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
