import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/user';
import { ticket } from '../../../domain/models/event';

@Injectable({
  providedIn: 'root'
})
export class TicketService implements ITicketService {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;
  constructor() { }

  getTicketsByEventId(eventId: number): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.API_URL}/Ticket/event/${eventId}`)
  }

  validateTicket(ticketId: number): Observable<ITicket> {
    return this.http.patch<ITicket>(
      `${this.API_URL}/Ticket/${ticketId}/approve`,
      null
    )
  }

  getTicketById(ticketId: number): Observable<ITicket> {
    return this.http.get<ITicket>(`${this.API_URL}/Ticket/${ticketId}`)
  }

  cancelTicket(ticketId: number): Observable<ITicket> {
    return this.http.patch<ITicket>(`${this.API_URL}/Ticket/${ticketId}/cancel`,
      null
    )
  }

  getByUserId(userId: number): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.API_URL}/Ticket/user/${userId}`)
  }

}


interface ITicketService {
  getTicketsByEventId(eventId: number): Observable<ITicket[]>
  validateTicket(ticketId: number): Observable<ITicket>
  cancelTicket(ticketId: number): Observable<ITicket>
  getByUserId(userId: number): Observable<ITicket[]>
  getTicketById(ticketId: number): Observable<ITicket>
}


export type ITicket = {
  id: number;
  codigoQR: string;
  dataCompra: string;
  status: number;
  nomeBilhete: string;
  preco: string;
  statusBilhete: number;
  nomeUsuario: string;
  usuarioId: number;
  tipoId: number;
  codigoQRBase64: string
  usuario: User;
  ticketType: ticket
}


export enum TicketStatus {
  Ativo = 0,
  Cancelado = 1,
  Utilizado = 2
}
