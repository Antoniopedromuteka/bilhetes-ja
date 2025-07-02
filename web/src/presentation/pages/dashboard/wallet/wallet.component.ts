import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FormatMoneyService } from '../../../../app/core/services/formatMoney.service';
import { Wallet, WalletService, WalletTransaction } from '../../../../app/core/services/wallet.service';
import { LoaderService } from '../../../../app/core/services/loader.service';

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
          <span>{{walletTransactions().length}} @if(walletTransactions().length > 1) {
            transações
          }@else {
            transação
          }
          </span>
          <select
            (change)="handleFilter($event)"
            class="bg-white p-2 rounded-md max-w-[200px] border outline-1 outline-gray-500"
          >
            <option value="todos">Todos</option>
            <option value="hoje">Este dia</option>
            <option value="esta_semana">Esta semana</option>
            <option value="este_mes">Este mês</option>
            <option value="este_ano">Este ano</option>
          </select>

          <div
            class="bg-white max-h-48 h-auto rounded-xl flex flex-col gap-3 p-5 overflow-y-auto"
          >
            @if(walletTransactions().length === 0){
              <span class="text-2xl font-medium">Sem transações</span>
            }
            @for(item of walletTransactions(); track $index){
              <div class="flex items-center gap-4 text-primary text-xs border-b my-1">
                <span>{{item.descricao}}</span>
                <span>{{formatCurrency.formatEuro(item.valor)}}</span>
                <span>{{this.formatDate(item.data)}}</span>
              </div>
            }
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
              <span class="text-primary font-medium text-xl">{{ formatCurrency.formatEuro(wallet().balance) }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white max-w-xs flex items-center rounded-md h-36">
        <div class="flex items-center gap-5 p-5">
          <div>
            <span class="font-medium">Processados</span>
            <div>
              <span class="text-primary font-medium text-xl">{{ formatCurrency.formatEuro(wallet().balance) }}</span>
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
  walletService = inject(WalletService)
  wallet = signal<Wallet>({} as Wallet)
  loaderService = inject(LoaderService)
  walletTransactions = signal<WalletTransaction[]>([])
  ngOnInit() {
    this.loaderService.show()
    this.walletService.getBalance().subscribe((wallet) => {
      this.wallet.set(wallet)
    })

    this.walletService.getTransactions().subscribe((transactions) => {
      this.walletTransactions.set(transactions)
    })
    this.loaderService.hide()
  }

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

  handleFilter(event: Event) {
    this.loaderService.show()
    const value = (event.target as HTMLSelectElement).value;
    this.walletService.getTransactions(value).subscribe((transactions) => {
      this.walletTransactions.set(transactions)
    })
    this.loaderService.hide()
  }

  formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleDateString('pt-PT', options);
  }
}
