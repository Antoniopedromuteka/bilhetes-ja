import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ticket } from '../../../domain/models/event';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService implements ITicketTypeService {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;
  constructor() { }
  getByEvendId(id: number): Observable<ticket[]> {
    return this.http.get<ticket[]>(`${this.API_URL}/TicketType/event/${id}`);
  }
  getById(id: number): Observable<ticket> {
      return this.http.get<ticket>(`${this.API_URL}/TicketType/${id}`);
  }

  createTicketType(ticket: registerTicketType): Observable<ticket> {
    return this.http.post<ticket>(`${this.API_URL}/TicketType`, ticket);
  }

  updateTicketType(ticket: registerTicketType): Observable<ticket> {
    return this.http.put<ticket>(`${this.API_URL}/TicketType/${ticket.id}`, {
      nome: ticket.nome,
      preco: ticket.preco,
      quantidade: ticket.quantidade
    });
  }

  deleteTicketType(id: number): Observable<ticket> {
    return this.http.delete<ticket>(`${this.API_URL}/TicketType/${id}`);
  }
}


interface ITicketTypeService {
  getById(id: number): Observable<ticket>
  getByEvendId(id: number): Observable<ticket[]>
  createTicketType(ticket: registerTicketType): Observable<ticket>
  updateTicketType(ticket: registerTicketType): Observable<ticket>
  deleteTicketType(id: number): Observable<ticket>
}



export type registerTicketType = {
  id?: number;
  nome: string;
  preco: number;
  quantidade: number;
  eventoId: number
}
