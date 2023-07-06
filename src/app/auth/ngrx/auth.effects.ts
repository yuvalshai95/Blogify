import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import * as authActions from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) =>
    actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request: registerRequestData }) => {
        return authService.register(registerRequestData).pipe(
          tap((user: IUser) => {
            persistanceService.setToLocalStorage('accessToken', user.token);
          }),
          map((user: IUser) => authActions.registerSuccess({ user })),
          catchError((err: HttpErrorResponse) => {
            return of(authActions.registerError({ errors: err.error.errors }));
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request: loginRequestData }) => {
        return authService.login(loginRequestData).pipe(
          tap((user: IUser) => {
            persistanceService.setToLocalStorage('accessToken', user.token);
          }),
          map((user: IUser) => authActions.loginSuccess({ user })),
          catchError((err: HttpErrorResponse) => {
            return of(authActions.loginError({ errors: err.error.errors }));
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false }
);
