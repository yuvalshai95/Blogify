import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserProfileService } from '../services/user-profile.service';
import { userProfileActions } from './user-profile.actions';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const getUserProfileEffect = createEffect(
  (actions$ = inject(Actions), userProfileService = inject(UserProfileService)) =>
    actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }: { slug: string }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: IUserProfile) => {
            return userProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(userProfileActions.getUserProfileError());
          })
        );
      })
    ),
  { functional: true }
);
