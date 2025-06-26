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
  getById(id: number): Observable<ticket> {
      return this.http.get<ticket>(`${this.API_URL}/TicketType/${id}`);
  }

}


interface ITicketTypeService {
  getById(id: number): Observable<ticket>
}


