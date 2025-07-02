import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderOverlayComponent } from '../loader/loaderOverlay/loaderOverlay.component';

const COMPONENTS = [RouterOutlet, HeaderComponent, FooterComponent, LoaderOverlayComponent]

@Component({
  selector: 'app-layout',
  imports: [...COMPONENTS, RouterOutlet],
  template: `
    <main class="w-full mi-h-screen">
      <app-loader-overlay />
      <app-header></app-header>
        <router-outlet></router-outlet>
      <app-footer></app-footer>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }
