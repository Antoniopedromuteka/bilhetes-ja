import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `<p>footer works!</p>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
