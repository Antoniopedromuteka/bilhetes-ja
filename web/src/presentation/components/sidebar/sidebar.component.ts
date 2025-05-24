import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      id="sidebar"
      class="fixed top-0 left-0 z-20 w-64 h-full pt-0 flex flex-col bg-black  border-r border-primary"
    >
      <div class="flex items-center text-white pl-4 space-x-2 h-16 ">
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
          class="lucide lucide-ticket-icon lucide-ticket"
        >
          <path
            d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        <h1 class="text-white text-2xl font-bold">BilheteJá</h1>
      </div>
      <div
        class="flex-1 flex flex-col justify-between overflow-y-auto px-3 py-5 space-y-1"
      >
        <ul class="space-y-2">
          <li>
            <a
              routerLink="/dashboard/home"
              routerLinkActive="bg-primary dark:bg-primary"
              class="flex items-center p-2 text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"
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
                class="lucide lucide-house-icon lucide-house"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                />
              </svg>
              <span class="ml-3">Dashboard</span>
            </a>
          </li>

          <li routerLink="/dashboard/events"
          routerLinkActive="bg-primary dark:bg-primary"
              class="flex items-center text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"

          >
            <button
              class="flex items-center w-full p-2 text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"
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
                class="lucide lucide-calendar-icon lucide-calendar"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span class="ml-3 flex-1 text-left">Eventos</span>
            </button>
          </li>

          <li routerLink="/dashboard/tickets"
          routerLinkActive="bg-primary dark:bg-primary"
              class="flex items-center  text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"

          >
            <button
              class="flex items-center w-full p-2 text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"
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
                class="lucide lucide-ticket-icon lucide-ticket"
              >
                <path
                  d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              <span class="ml-3 flex-1 text-left">Meus bilhetes</span>
            </button>
          </li>

          <li routerLink="/dashboard/wallet"
          routerLinkActive="bg-primary dark:bg-primary"
              class="flex items-center text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"

          >
            <button
              class="flex items-center w-full p-2 text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"
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
                class="lucide lucide-wallet-icon lucide-wallet"
              >
                <path
                  d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
                />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
              <span class="ml-3 flex-1 text-left">Carteira</span>
            </button>
          </li>

          <li>
            <a
              routerLink="/dashboard/settings"
              routerLinkActive="bg-primary dark:bg-primary"
              class="flex items-center p-2 text-base text-white rounded-lg hover:bg-primary dark:text-white dark:hover:bg-primary"
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
                class="lucide lucide-cog-icon lucide-cog"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="m17 20.66-1-1.73" />
                <path d="M11 10.27 7 3.34" />
                <path d="m20.66 17-1.73-1" />
                <path d="m3.34 7 1.73 1" />
                <path d="M14 12h8" />
                <path d="M2 12h2" />
                <path d="m20.66 7-1.73 1" />
                <path d="m3.34 17 1.73-1" />
                <path d="m17 3.34-1 1.73" />
                <path d="m11 13.73-4 6.93" />
              </svg>
              <span class="ml-3">Configurações</span>
            </a>
          </li>
        </ul>
        <div class="flex">
          <span class="text-sm text-gray-500">Versão 1.0.0</span>
        </div>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isActiveMenu = signal<boolean>(true);

  toggleMenu() {
    this.isActiveMenu.set(!this.isActiveMenu());
  }
}
