import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateArticleService } from '../services/create-article.service';
import { IArticleRequest } from '../../shared/interfaces/article-request.interface';
import { createArticleActions } from './create-article.actions';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

export const createArticleEffect = createEffect(
  (actions$ = inject(Actions), createArticleService = inject(CreateArticleService)) =>
    actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }: { request: IArticleRequest }) => {
        return createArticleService.createArticle(request).pipe(
          map((article: IArticle) => createArticleActions.createArticleSuccess({ article })),
          catchError((err: HttpErrorResponse) => {
            return of(createArticleActions.createArticleError({ errors: err.error.errors }));
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }: { article: IArticle }) => {
        router.navigate(['/article', article.slug]);
      })
    ),
  {
    functional: true,
    dispatch: false,
  }
);
