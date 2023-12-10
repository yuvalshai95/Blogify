import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import * as authActions from './auth.actions';
import { IUserRequest } from '../../shared/interfaces/user-request.interface';

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) =>
    actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.getFromLocalStorage('accessToken');

        if (!token) {
          return of(authActions.getCurrentUserError());
        }

        return authService.getCurrentUser().pipe(
          map((user: IUser) => authActions.getCurrentUserSuccess({ user })),
          catchError((err: HttpErrorResponse) => {
            return of(authActions.getCurrentUserError());
          })
        );
      })
    ),
  { functional: true }
);

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

export const updateCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({ currentUserRequest }: { currentUserRequest: IUserRequest }) => {
        return authService.updateCurrentUser(currentUserRequest).pipe(
          map((user: IUser) => authActions.updateCurrentUserSuccess({ user })),
          catchError((err: HttpErrorResponse) => {
            return of(authActions.updateCurrentUserError({ errors: err?.error?.errors || 'Some Error Occurred' }));
          })
        );
      })
    ),
  { functional: true }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router), persistanceService = inject(PersistanceService)) =>
    actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.setToLocalStorage('accessToken', '');
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false }
);
