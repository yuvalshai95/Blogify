import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthResponse } from '../interfaces/auth.interface';
import { IRegisterRequest } from '../interfaces/register.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ILoginRequest } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://api.realworld.io/api';
  constructor(private readonly http: HttpClient) {}

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IAuthResponse>(`${this.BASE_URL}/user`).pipe(map((res) => res.user));
  }

  register(registerRequestData: IRegisterRequest): Observable<IUser> {
    return this.http.post<IAuthResponse>(`${this.BASE_URL}/users`, registerRequestData).pipe(map((res) => res.user));
  }

  login(loginRequestData: ILoginRequest): Observable<IUser> {
    return this.http.post<IAuthResponse>(`${this.BASE_URL}/users/login`, loginRequestData).pipe(map((res) => res.user));
  }
}
