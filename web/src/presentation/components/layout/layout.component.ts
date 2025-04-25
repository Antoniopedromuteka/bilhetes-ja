import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

const COMPONENTS = [RouterOutlet, HeaderComponent, FooterComponent]

@Component({
  selector: 'app-layout',
  imports: [...COMPONENTS, RouterOutlet],
  template: `
    <main class="w-full mi-h-screen">
      <app-header></app-header>
        <router-outlet></router-outlet>
      <app-footer></app-footer>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }
