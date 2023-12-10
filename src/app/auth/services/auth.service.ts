import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable, map } from 'rxjs';
import type { IAuthResponse } from '../interfaces/auth.interface';
import type { IRegisterRequest } from '../interfaces/register.interface';
import type { IUser } from 'src/app/shared/interfaces/user.interface';
import type { ILoginRequest } from '../interfaces/login.interface';
import { IUserRequest } from 'src/app/shared/interfaces/user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://api.realworld.io/api';
  constructor(private readonly http: HttpClient) {}

  public getCurrentUser(): Observable<IUser> {
    return this.http.get<IAuthResponse>(`${this.BASE_URL}/user`).pipe(map((res: IAuthResponse) => res.user));
  }

  public register(registerRequestData: IRegisterRequest): Observable<IUser> {
    return this.http
      .post<IAuthResponse>(`${this.BASE_URL}/users`, registerRequestData)
      .pipe(map((res: IAuthResponse) => res.user));
  }

  public login(loginRequestData: ILoginRequest): Observable<IUser> {
    return this.http
      .post<IAuthResponse>(`${this.BASE_URL}/users/login`, loginRequestData)
      .pipe(map((res: IAuthResponse) => res.user));
  }

  public updateCurrentUser(currentUserRequest: IUserRequest): Observable<IUser> {
    return this.http
      .put<IAuthResponse>(`${this.BASE_URL}/user`, currentUserRequest)
      .pipe(map((res: IAuthResponse) => res.user));
  }
}
