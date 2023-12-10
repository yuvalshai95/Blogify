import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AddToFavoritesService } from '../services/add-to-favorites.service';
import { addToFavritesAcions } from './add-to-favorites.actions';
import { IArticle } from '../../../../shared/interfaces/article.interface';

export const addToFavoritesEffect = createEffect(
  (actions$ = inject(Actions), addToFavoritesService = inject(AddToFavoritesService)) =>
    actions$.pipe(
      ofType(addToFavritesAcions.addToFavorites),
      switchMap(({ isFavorited, slug }: { isFavorited: boolean; slug: string }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article: IArticle) => addToFavritesAcions.addToFavoritesSuccess({ article })),
          catchError((err: HttpErrorResponse) => {
            return of(addToFavritesAcions.addToFavoritesError());
          })
        );
      })
    ),
  { functional: true }
);
