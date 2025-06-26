import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService implements IEmailservice {
  private http = inject(HttpClient)
  private readonly API_URL = environment.API_PUBLIC_URL;

  sendEmail({to, subject, message}: {to: string, subject: string, message: string}): Observable<any> {
    return this.http.post(`${this.API_URL}/Email`, {
      to,
      subject,
      body:message
    });
  }
}


interface IEmailservice {
  sendEmail({to, subject, message}: {to: string, subject: string, message: string}): Observable<any>;
}
