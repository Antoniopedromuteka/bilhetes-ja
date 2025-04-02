import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CardEventComponent } from '../../components/cardEvent/cardEvent.component';
import { ActivatedRoute } from '@angular/router';

const COMPONENTS = [CardEventComponent]
@Component({
  selector: 'app-search',
  imports: [...COMPONENTS],
  template: `
    <main class="max-w-[1280px] mx-auto h-[calc(100vh-64px] mt-[64px] h-auto w-full">
      <div class="py-10">
        <div class="flex flex-col gap-2 mb-5">
        <span class="text-xl font-medium">Pesquisa</span>
        <span class="text-2xl font-bold">"{{ search() }}"</span>
        </div>
        <h4 class="text-xl font-medium text-gray-400">8 Eventos encontrados</h4>
        <section class="grid grid-cols-3 gap-5 mt-10">
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
          <app-card-event />
        </section>
      </div>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public search = signal<string>('');
  public router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.params.subscribe((params) => this.search.set(params['searchTerm']));
  }

}
