import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderDashComponent } from '../headerDash/headerDash.component';

const COMPONENTS = [SidebarComponent, HeaderDashComponent];

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, ...COMPONENTS],
  template: `
    <div class="w-full flex h-screen relative">
      <!-- Sidebar -->
      @if(isActiveMenu()){
      <aside class="w-64 absolute lg:relative top-0 left-0 h-full bg-white shadow-lg">
        <app-sidebar></app-sidebar>
      </aside>
      }

      <!-- Main content -->
      <div class="w-full relative flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header
          class="w-full bg-white shadow-md px-4 py-3 sticky top-0 z-40 flex items-center justify-between"
        >
          <div (click)="toggleMenu()" class="cursor-pointer">
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
              class="lucide lucide-columns2-icon lucide-columns-2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M12 3v18" />
            </svg>
          </div>
          <app-header-dash></app-header-dash>
        </header>

        <!-- Page content -->
        <main class="flex-1 overflow-y-auto p-4 bg-white">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  isActiveMenu = signal<boolean>(true);

  toggleMenu() {
    this.isActiveMenu.set(!this.isActiveMenu());
  }
}
