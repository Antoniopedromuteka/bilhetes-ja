import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderOverlayComponent } from '../presentation/components/loader/loaderOverlay/loaderOverlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderOverlayComponent],
  template: `
        <app-loader-overlay />
        <router-outlet></router-outlet>
    `,
  styles: ''
})
export class AppComponent {
  title = 'bilhete-ja';
}
