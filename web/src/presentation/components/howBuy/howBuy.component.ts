import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HOW_BUY_MOCKS } from '../../../lib/mocks/howBuy';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

const COMPONENTS = [];
const MODULES = []

@Component({
  selector: 'app-how-buy',
  imports: [RouterLink],
  template: `<main class="w-full h-auto">
    <section class="w-full bg-primary h-auto">
      <div class="max-w-[1280px] mx-auto w-full h-[15rem]">
        <div class="text-white text-2xl pt-[5rem] font-semibold">
          <h3>COMO COMPRAR O SEU INGRESSO</h3>
          <span>na plataforma bilheteJá?</span>
        </div>
      </div>
    </section>
    <section
      class="max-w-[1280px] mx-auto w-full h-auto py-10 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
    >
      @for(item of howBuyMocks; track $index){
      <div
        class="p-5 w-full h-[15rem] hover:border-b-2 hover:border-primary hover:shadow-lg hover:scale-95 hover:duration-200 cursor-pointer flex flex-col gap-8"
      >
        <div class="p-3 max-w-[4rem] bg-primary flex justify-center items-center rounded-xl text-white">
          <span [innerHTML]="sanitizeIcon(item.icon)"></span>
        </div>
        <div class="flex flex-col gap-3">
          <h4 class="text-xl font-medium">{{ item.title }}</h4>
          <p class="text-slate-400">
            {{ item.description }}
          </p>
        </div>
      </div>
      }
    </section>
    <div class="w-full flex items-center justify-center py-8">
      <button routerLink="/events" class="bg-primary hover:brightness-90 duration-200 hover:scale-95 text-white px-12 py-3 font-semibold cursor-pointer rounded-lg">Comprar Agora</button>
    </div>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowBuyComponent {
  public readonly howBuyMocks = HOW_BUY_MOCKS;
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
