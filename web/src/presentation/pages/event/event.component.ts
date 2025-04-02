import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-event',
  imports: [],
  template: `<p>event works!</p>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent { }
