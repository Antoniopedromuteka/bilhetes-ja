import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  private snackBar = inject(MatSnackBar)
  success(message: string, duration: number = DURATION_DEFAULT): void {
    this.snackBar.open(message, 'Fechar', { duration, panelClass: 'toast-success', horizontalPosition: 'center', verticalPosition: 'top' });
  }

  error(message: string, duration: number = DURATION_DEFAULT): void {
    this.snackBar.open(message, 'Fechar', { duration, panelClass: 'toast-error', horizontalPosition: 'center', verticalPosition: 'top' });
  }

  info(message: string, duration: number = DURATION_DEFAULT): void {
    this.snackBar.open(message, 'Fechar', { duration, panelClass: 'toast-info', horizontalPosition: 'center', verticalPosition: 'top' });
  }
}

const DURATION_DEFAULT = 3000;
