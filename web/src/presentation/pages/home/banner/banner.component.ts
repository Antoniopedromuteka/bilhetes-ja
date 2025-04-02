import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  template: `
    <main class="w-full h-[356px] bg-primary flex items-center justify-center">
      <div class="flex flex-col gap-3 max-w-[1280px] mx-auto">
        <h2 class="text-5xl font-bold text-white text-center">Encontre os Melhores Eventos</h2>
        <p class="text-xl text-white text-center">Compre seus ingressos de forma rápida, fácil e segura</p>
        <div class="flex items-center gap-3 justify-center">
          <button class="bg-white text-primary px-4 py-2 rounded-md cursor-pointer">Explorar Eventos</button>
          <button class="bg-primary text-white px-4 py-2 rounded-md border-2 border-white cursor-pointer">Criar Evento</button>
        </div>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent { }
