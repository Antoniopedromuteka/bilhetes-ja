import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../presentation/components/footer/footer.component';
import { HeaderComponent } from '../presentation/components/header/header.component';

const COMPONENTS = [RouterOutlet, HeaderComponent, FooterComponent]

@Component({
  selector: 'app-root',
  imports: [...COMPONENTS],
  template: `
    <main class="w-full mi-h-screen">
      <app-header></app-header>
        <router-outlet></router-outlet>
      <app-footer></app-footer>
    </main>
    `,
  styles: ''
})
export class AppComponent {
  title = 'bilhete-ja';
}
