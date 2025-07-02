import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../../../domain/models/event';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;
  constructor() { }
  getEventByFilter(filter: EventFilterDTO): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/Event/pesquisar`, { params: filter });
  }

  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.API_URL}/Event/${eventId}`);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/Event`).pipe(
      map(events => events.filter(event => event.status === 1))
    )
  }

  createEvent(event: registerEventPayload): Observable<Event> {
    return this.http.post<Event>(`${this.API_URL}/Event`, event);
  }

  updateEvent(event: updateEventPayload): Observable<Event> {
    return this.http.put<Event>(`${this.API_URL}/Event/${event.id}`, event);
  }

  getEventsByCategory(categoryId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/Event/category/${categoryId}`).pipe(
      map(events => events.filter(event => event.status === 1))
    )
  }

  getEventsByUserId(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/Event/user/${userId}`).pipe(
      map(events => events.filter(event => event.status === 1))
    )
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.API_URL}/Event/${eventId}`);
  }
}



interface IEventService {
  getEvent(eventId: number): Observable<Event>
  getEvents(): Observable<Event[]>
  getEventById(eventId: number): Observable<Event>
  createEvent(event: registerEventPayload): Observable<Event>
  updateEvent(event: updateEventPayload): Observable<Event>
  getEventsByCategory(categoryId: number): Observable<Event[]>
  getEventByFilter(filter: EventFilterDTO): Observable<Event[]>
  getEventsByUserId(userId: number): Observable<Event[]>
}

export type registerEventPayload = {
  nome: string;
  categoriaId: number;
  dataEvento: Date;
  descricao: string;
  organizadorId: number;
  local: string;
  lotacaoTotal: number;
  imagemId?: string | null;
};

export type updateEventPayload = {
  id: number;
  nome: string;
  categoriaId: number;
  descricao: string;
  dataEvento: Date;
  lotacaoTotal: number;
  local: string;
  organizadorId: number;
  status: number;
  imagemId?: string | null;
};


export type EventFilterDTO = {
  CategoriaId?: number;
  Local?: string;
  Nome?: string
};
