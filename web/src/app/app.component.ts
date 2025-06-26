import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderOverlayComponent } from '../presentation/components/loader/loaderOverlay/loaderOverlay.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

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

   constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }
}
