import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagType } from 'src/app/shared/interfaces/popular-tag.type';
import { PopularTagService } from '../services/popular-tag.service';
import { popularTagsActions } from './popular-tags.actions';

export const getPopularTagsffect = createEffect(
  (actions$ = inject(Actions), popularTagsService = inject(PopularTagService)) =>
    actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => popularTagsActions.getPopularTagsSuccess({ popularTags })),
          catchError((err: HttpErrorResponse) => {
            return of(popularTagsActions.getPopularTagsError());
          })
        );
      })
    ),
  { functional: true }
);
