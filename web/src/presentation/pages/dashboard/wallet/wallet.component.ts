import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FormatMoneyService } from '../../../../app/core/services/formatMoney.service';

const COMPONENTS = [BreadcrumbComponent];

@Component({
  selector: 'app-wallet',
  imports: [...COMPONENTS],
  template: `
    <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
    <section>
      <div class="mt-5">
        <h2 class="text-2xl font-medium">Carteira</h2>
      </div>
      <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="col-span-1 bg-primary h-64 rounded-xl p-6">
          <span class="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
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
          </span>
          <div class="mt-10">
            <span class="text-white text-4xl">{{"**** **** **** 3543"}}</span>
          </div>
        </div>
        <div class="col-span-1 h-auto flex flex-col gap-3">
          <span>0 transação</span>
          <select
            class="bg-white p-2 rounded-md max-w-[200px] border outline-1 outline-gray-500"
          >
            <option>Este ano</option>
            <option>Este mês</option>
            <option>Esta semana</option>
            <option>Este dia</option>
          </select>

          <div
            class="bg-white min-h-48 h-auto rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl font-medium">Sem transações</span>
          </div>
        </div>
      </div>
      <div class="mt-5 max-w-[610px] flex flex-col gap-4 h-auto">
        <div class="flex bg-white items-center gap-5 p-5 rounded-md">
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
          <div>
            <span class="font-medium">Saldo líquido</span>
            <div>
              <span class="text-primary font-medium text-xl">{{ formatCurrency.formatEuro(10) }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white max-w-xs flex items-center rounded-md h-36">
        <div class="flex items-center gap-5 p-5">
          <div>
            <span class="font-medium">Processados</span>
            <div>
              <span class="text-primary font-medium text-xl">{{ formatCurrency.formatEuro(10) }}</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent {
  formatCurrency = inject(FormatMoneyService)
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Carteira',
        url: '/dashboard/wallet',
      },
    ],
  };
}
