import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-event',
  imports: [],
  template: `
    <section
      class="max-w-[410px] w-full h-[372px] bg-gray-50 rounded-md flex flex-col"
    >
      <div class="w-full h-[192px] bg-black rounded-t-md"></div>
      <div class="pt-8 px-3 h-auto flex flex-col gap-3">
        <h2 class="font-medium">Event Title</h2>
        <p class="text-sm flex items-center gap-1 text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          <span>15 Mar 2024</span>
        </p>
        <p class="text-sm text-slate-500">Almada, Setubal, Portugal</p>
        <a href="">
          <p class="text-base text-primary font-medium">A partir de 20€</p>
        </a>
      </div>
    </section>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEventComponent {}
