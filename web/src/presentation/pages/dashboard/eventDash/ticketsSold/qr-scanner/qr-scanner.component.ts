import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  imports: [ZXingScannerModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded-lg w-[90%] max-w-md text-center">
        <zxing-scanner
          [torch]="false"
          [tryHarder]="true"
          (scanSuccess)="onCodeResult($event)"
        ></zxing-scanner>
        <button (click)="close()" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Fechar</button>
      </div>
    </div>
  `,
  styleUrl: './qr-scanner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrScannerComponent {
  @Output() scanned = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  onCodeResult(result: string) {
    this.scanned.emit(result);
  }

  close() {
    this.closed.emit();
  }
 }
