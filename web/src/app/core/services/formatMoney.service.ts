import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatMoneyService {

  constructor() { }

  formatEuro(value: number): string {
    if(!value) return '';
    return value.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });
  }

}
