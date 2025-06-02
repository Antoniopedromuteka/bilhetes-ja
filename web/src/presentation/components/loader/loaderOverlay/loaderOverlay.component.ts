import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LoaderService } from '../../../../app/core/services/loader.service';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'app-loader-overlay',
  imports: [LoaderComponent],
  template: `
    @if(isLoading()){
      <app-loader></app-loader>
    }
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderOverlayComponent {
  private loader = inject(LoaderService);
  isLoading = computed(() => this.loader.isLoading());
}
