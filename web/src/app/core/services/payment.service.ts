import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../../../domain/models/payment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements IPaymentService {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;
  constructor() { }

  pay(payment: Payment): Observable<any> {
    return this.http.post<PaymentResponse>(`${this.API_URL}/Payments`, payment);
  }
}


interface IPaymentService {
  pay(payment: Payment): Observable<PaymentResponse>
}


export type PaymentResponse = {
  stripePaymentId: string
  sucesso: boolean
  mensagem: string
}
