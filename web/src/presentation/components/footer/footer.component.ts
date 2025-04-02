import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="w-full h-[25rem] bg-tertiary flex flex-col px-3 xl:px-0 py-10 justify-between">
      <div class="max-w-[1280px] mx-auto grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3">
        <div class="w-full flex flex-col flex-wrap">
          <h4 class="text-white text-xl font-bold">Bilhetes Já</h4>
          <p class="text-slate-400 mt-2 text-sm">
            Sua plataforma de venda de bilhetes online segura e confiável.
          </p>
        </div>
        <div>
          <h4 class="text-white text-xl font-bold">Links Rápidos</h4>
          <ul class="list-none space-y-2 mt-2 text-slate-400">
            <li>Início</li>
            <li>Eventos</li>
            <li>Sobre</li>
            <li>Contato</li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-xl font-bold">Suporte</h4>
          <ul class="list-none space-y-2 mt-2 text-slate-400">
            <li>FAQ</li>
            <li>Termos de Uso</li>
            <li>Privacidade</li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-xl font-bold">Redes Sociais</h4>
          <ul class="list-none space-y-2 mt-2 flex gap-2 text-slate-400">
            <li>
              <a
                href="https://twitter.com/bilhetesja"
                target="_blank"
                rel="noopener noreferrer"
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
                  class="lucide lucide-twitter-icon lucide-twitter"
                >
                  <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/bilhetesja"
                target="_blank"
                rel="noopener noreferrer"
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
                  class="lucide lucide-instagram-icon lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/bilhetesja"
                target="_blank"
                rel="noopener noreferrer"
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
                  class="lucide lucide-facebook-icon lucide-facebook"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="text-slate-600 mx-5 h-[1px]" />
      <div class="w-full max-w-[1280px] mx-auto h-[3rem] flex items-center justify-center">
        <p class="text-slate-400 text-center">
          &copf; 2025 Bilhetes Já. Todos os direitos reservados
        </p>
      </div>
    </footer>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
