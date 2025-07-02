import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService implements IWalletService{
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL
  constructor() { }

  getBalance(): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.API_URL}/Wallet/balance`)
  }

  getTransactions(filter?: string): Observable<WalletTransaction[]> {
    return this.http.get<WalletTransaction[]>(`${this.API_URL}/Wallet/filter?Period=${filter ?? 'este_ano'}`)
  }

}

interface IWalletService {
  getBalance(): Observable<Wallet>
  getTransactions(filter?: string): Observable<WalletTransaction[]>
}

export type Wallet = {
  balance: number
}

export type WalletTransaction = {
  id: number,
  valor: number,
  descricao: string,
  data: string,
}
