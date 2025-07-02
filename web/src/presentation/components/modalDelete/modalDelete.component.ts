import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  imports: [],
  template: `
  <div class="fixed inset-0 bg-gray-50/[var(--bg-opacity)] pt-20 [--bg-opacity:50%] flex items-center justify-center p-4 z-50">
    <div class="max-w-[400px] w-full border h-auto max-h-[120px] flex flex-col  gap-4 bg-white px-3 py-5 rounded-md">
      <span class="text-md font-medium text-slate-700 text-sm">{{description}}</span>
      <div class="flex gap-2 w-full justify-end">
        <button class="bg-red-500 cursor-pointer hover:bg-red-700 text-white font-normal py-1 px-4 rounded" (click)="handleCloseModal()">Cancelar</button>
        <button class="bg-primary cursor-pointer hover:bg-primary-dark text-white font-normal py-1 px-4 rounded" (click)="handleConfirmDelete()">Eliminar</button>
      </div>
    </div>
  </div>
  `,
  styleUrl: './modalDelete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();
  @Input() description = '';


  handleCloseModal() {
    this.closeModal.emit();
  }

  handleConfirmDelete() {
    this.confirmDelete.emit();
  }
}
