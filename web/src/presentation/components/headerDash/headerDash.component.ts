import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-dash',
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-end relative">
      <div class="flex flex-col">
        <div (click)="toggleActive()" class="flex items-center gap-2 cursor-pointer">
          <span>olá, {{ 'Antonio' }}</span>
          <div
            class="w-10 h-10 rounded-full bg-gray-950 flex items-center justify-center"
          ></div>
        </div>

        @if(isActive()){
        <div class="flex flex-col space-y-2 cursor-pointer h-auto w-[14rem] items-center absolute top-[3.4rem] right-0 bg-white shadow-lg rounded-lg p-4">
          <div class="flex flex-col items-center">
          <span class="text-xs">Antonio Pedro Elias Muteka</span>
          <span class="text-sm">{{ 'antoniomuteka2004@gmail.com' }}</span>
          </div>
          <div class="w-full h-auto flex flex-col gap-2 border-t-2 border-gray-200 pt-2">
            <ul class="flex flex-col gap-2">
              <li routerLink="/settings"  class="flex items-center gap-0.5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cog-icon lucide-cog"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>
                <span>Configurações</span>
              </li>
              <li routerLink="/logout" class="flex items-center gap-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                <span>Sair</span>
              </li>
            </ul>
          </div>
        </div>
      }
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashComponent {
  isActive = signal<boolean>(false);

  toggleActive() {
    this.isActive.set(!this.isActive());
  }
}
