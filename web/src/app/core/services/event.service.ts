import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../../../domain/models/event';
import { Observable } from 'rxjs';

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
    return this.http.get<Event[]>(`${this.API_URL}/Event`);
  }

  createEvent(event: registerEventPayload): Observable<Event> {
    return this.http.post<Event>(`${this.API_URL}/Event`, event);
  }

  updateEvent(event: updateEventPayload): Observable<Event> {
    return this.http.put<Event>(`${this.API_URL}/Event/${event.id}`, event);
  }

  getEventsByCategory(categoryId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/Event/category/${categoryId}`);
  }

}


interface IEventService {
  getEvent(eventId: number): Observable<Event>
  getEvents(): Observable<Event[]>
  createEvent(event: registerEventPayload): Observable<Event>
  updateEvent(event: updateEventPayload): Observable<Event>
  getEventsByCategory(categoryId: number): Observable<Event[]>
  getEventByFilter(filter: EventFilterDTO): Observable<Event[]>

}

type registerEventPayload = {
  nome: string;
  categoriaId: number;
  dataEvento: Date;
  lotacaoTotal: number;
  imagem?: string | null; // Optional field for image URL
};

type updateEventPayload = {
  id: number;
  nome: string;
  categoriaId: number;
  dataEvento: Date;
  lotacaoTotal: number;
  imagem?: string | null; // Optional field for image URL
};


export type EventFilterDTO = {
  CategoriaId?: number;
  Local?: string;
  Nome?: string
};
