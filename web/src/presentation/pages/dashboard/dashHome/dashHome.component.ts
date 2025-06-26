import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { ChartViewComponent } from '../../../components/chart/chart.component';
import { ChartPieComponent } from '../../../components/chartPie/chartPie.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormatMoneyService } from '../../../../app/core/services/formatMoney.service';

const COMPONENTS = [BreadcrumbComponent, ChartViewComponent];
@Component({
  selector: 'app-dash-home',
  imports: [...COMPONENTS, ChartPieComponent],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section
        class="py-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 mt-3 gap-5"
      >
        @for(item of statistics; track $index){
        <div
          class="bg-white rounded-lg p-4 h-40 flex flex-col justify-between"
        >
          <div class="flex items-center gap-2">
            <span class="text-slate-800 text-xs" [innerHTML]="getIconUrl(item.icon!)">
            </span>
            <span class="font-medium text-md text-slate-600 ">{{
              item.label
            }}</span>
          </div>
          <div class="">
            @if(item.label === "Total de Vendas"){
              <span class="text-md xl:text-3xl font-medium">
                {{ formatCurrency.formatEuro(item.value) }}
              </span>
            }
            @else {
              <span class="text-md xl:text-3xl font-medium">
                {{ item.value }}
              </span>
            }
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-600">{{ item.percentage }}%</span>
            <span class="text-sm text-slate-500">vs last month</span>
          </div>
        </div>
        }
      </section>
      <section class="w-full mt-5 grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div class="col-span-1 lg:col-span-2 border rounded-md bg-white">
          <app-chart />
        </div>
        <div
          class="col-span-1 lg:col-span-2 flex items-center justify-center bg-white border rounded-md"
        >
          <app-chart-pie />
        </div>
      </section>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashHomeComponent {
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Inicio',
        url: '/dashboard',
      },
    ],
  };
  statistics: Istatistic[] = [
    {
      label: 'Total de Vendas',
      value: 440,
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhZGdlLWV1cm8taWNvbiBsdWNpZGUtYmFkZ2UtZXVybyI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0iTTcgMTJoNSIvPjxwYXRoIGQ9Ik0xNSA5LjRhNCA0IDAgMSAwIDAgNS4yIi8+PC9zdmc+',
      percentage: 30,
    },
    {
      label: 'Eventos',
      value: 440,
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWljb24gbHVjaWRlLWNhbGVuZGFyIj48cGF0aCBkPSJNOCAydjQiLz48cGF0aCBkPSJNMTYgMnY0Ii8+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSI0IiByeD0iMiIvPjxwYXRoIGQ9Ik0zIDEwaDE4Ii8+PC9zdmc+',
      percentage: 30,
    },
    {
      label: 'Bilhetes vendidos',
      value: 440,
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRpY2tldC1pY29uIGx1Y2lkZS10aWNrZXQiPjxwYXRoIGQ9Ik0yIDlhMyAzIDAgMCAxIDAgNnYyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtMmEzIDMgMCAwIDEgMC02VjdhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJaIi8+PHBhdGggZD0iTTEzIDV2MiIvPjxwYXRoIGQ9Ik0xMyAxN3YyIi8+PHBhdGggZD0iTTEzIDExdjIiLz48L3N2Zz4=',
      percentage: 30,
    },
    {
      label: 'Bilhetes Comprados',
      value: 440,
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRpY2tldC1jaGVjay1pY29uIGx1Y2lkZS10aWNrZXQtY2hlY2siPjxwYXRoIGQ9Ik0yIDlhMyAzIDAgMCAxIDAgNnYyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtMmEzIDMgMCAwIDEgMC02VjdhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJaIi8+PHBhdGggZD0ibTkgMTIgMiAyIDQtNCIvPjwvc3ZnPg==',
      percentage: 30,
    },
  ];

  formatCurrency = inject(FormatMoneyService);

  private sanitizer: DomSanitizer = inject(DomSanitizer);
  sanitizedIcon!: SafeHtml;


  getIconUrl(iconUrl: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(atob(iconUrl.split(',')[1]));
  }
}

export type Istatistic = {
  label: string;
  value: number;
  icon: string;
  percentage: number;
};
