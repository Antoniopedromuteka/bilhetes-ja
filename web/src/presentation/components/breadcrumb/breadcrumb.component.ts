import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

const COMPONENTS = [
  RouterLink,
]

@Component({
  selector: 'app-breadcrumb',
  imports: [...COMPONENTS],
  template: `
    <nav>
      <ol class="flex items-center space-x-2">
        <li>
          <span class="cursor-pointer text-slate-900 font-medium" routerLink="{{ breadcrumbItems.url }}">{{
            breadcrumbItems.label
          }}</span>
        </li>
        @if(breadcrumbItems.items) { @for(subitem of breadcrumbItems.items; track $index;) {
        @if(breadcrumbItems.items.length != $index) {
          <li>></li>
        }
        <li class="text-slate-900 font-medium cursor-pointer">
          <span routerLink="{{ subitem.url }}">{{
            subitem.label
          }}</span>
        </li>
        }}
      </ol>
    </nav>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() breadcrumbItems: BreadcrumbItem = {
    label: '',
    url: '',
    items: [],
  };
}

type BreadcrumbItem = {
  label: string;
  url: string;
  items?: BreadcrumbItem[];
};
