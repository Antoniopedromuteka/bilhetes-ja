import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/user';
import { environment } from '../../../environments/environment';

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface ListUser {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipoUsuario: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private readonly API_URL = environment.API_PUBLIC_URL;
  constructor(private http: HttpClient) { }


  registerUser(registerPayload: RegisterPayload): Observable<User> {
    return this.http.post(this.API_URL + '/Auth/register', registerPayload) as Observable<User>;
  }

  login(loginPayload: LoginPayload): Observable<User> {
    return this.http.post(this.API_URL + '/Auth/login', { ...loginPayload }) as Observable<User>;
  }

  usersMe(): Observable<ListUser> {
    return this.http.get(this.API_URL + '/User/me') as Observable<ListUser>;
  }

  updateUser(user: { id: number, nome: string, email: string, telefone: string}): Observable<ListUser> {
    return this.http.put(this.API_URL + '/User/'+user.id, user) as Observable<ListUser>;
  }

  updatePassword(payload: { currentPassword: string, newPassword: string, confirmPassword: string}): Observable<ListUser> {
    return this.http.put(this.API_URL + '/User/update-password/', payload) as Observable<ListUser>;
  }

}

interface IAuthService {
  registerUser(registerPayload: RegisterPayload): Observable<User>;
  login(loginPayload: LoginPayload): Observable<User>;
  usersMe(): Observable<ListUser>;
  updateUser(user: ListUser): Observable<ListUser>;
}
