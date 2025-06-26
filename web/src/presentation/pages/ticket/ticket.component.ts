import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

const COMPONENTS = [QRCodeComponent];

@Component({
  selector: 'app-ticket',
  imports: [...COMPONENTS],
  template: `
    <main
      class="max-w-[1248px] mx-auto min-h-screen mt-[64px] flex items-center justify-center"
    >
      <div
        class="relative max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div class="relative py-4 px-6 bg-primary text-white">
          <div
            class="absolute -bottom-2 left-0 right-0 h-4 flex justify-between"
            style="background-image: radial-gradient(circle at 50% 0, white 25%, transparent 25%), radial-gradient(circle at 50% 0, white 25%, transparent 25%); background-size: 20px 20px; background-position: 0 0, 10px 10px;"
          ></div>

          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold truncate">{{ title }}</h2>
            <span class="text-white">
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
                class="lucide lucide-ticket h-8 w-8 text-white"
              >
                <path
                  d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                ></path>
                <path d="M13 5v2"></path>
                <path d="M13 17v2"></path>
                <path d="M13 11v2"></path>
              </svg>
            </span>
          </div>
          <p class="mt-2 text-indigo-100 truncate">{{ description }}</p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Data</p>
              <p class="font-semibold">{{ date }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Horário</p>
              <p class="font-semibold">{{ time }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Local</p>
              <p class="font-semibold truncate">{{ location }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-gray-500 text-sm">Assento</p>
              <p class="font-semibold text-2xl">{{ seat }}</p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-dashed border-gray-300">
            <div class="">
              <qrcode
                [qrdata]="'flffk'"
                [allowEmptyString]="true"
                [ariaLabel]="'QR Code image with the following content...'"
                [cssClass]="'center'"
                [colorDark]="'#000000ff'"
                [colorLight]="'#ffffffff'"
                [elementType]="'canvas'"
                [errorCorrectionLevel]="'M'"
                [imageHeight]="75"
                [imageWidth]="75"
                [margin]="4"
                [scale]="1"
                [title]="'A custom title attribute'"
                [width]="300"
              ></qrcode>
            </div>
            <p class="text-center text-xs mt-2 text-gray-500">
              Apresente este ingresso na entrada
            </p>
          </div>
        </div>

        <!-- Recorte inferior -->
        <div
          class="absolute -top-2 left-0 right-0 h-4 flex justify-between"
          style="background-image: radial-gradient(circle at 50% 100%, white 25%, transparent 25%), radial-gradient(circle at 50% 100%, white 25%, transparent 25%); background-size: 20px 20px; background-position: 0 0, 10px 10px;"
        ></div>
      </div>
    </main>
  `,
  styleUrl: './ticket.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketComponent {
  title: string = 'Título do Evento';
  description: string = 'Descrição do evento ou ingresso';
  date: string = '25 JUN 2025';
  time: string = '19:30h';
  location: string = 'Local do Evento';
  seat: string = 'A23';
  barcode: string = 'https://via.placeholder.com/150x50?text=Barcode';
  logo: string = 'https://via.placeholder.com/50';
}
