import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { articleActions } from './article.actions';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(SharedArticleService)) =>
    actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }: { slug: string }) => {
        return articleService.getArticle(slug).pipe(
          map((article: IArticle) => articleActions.getArticleSuccess({ article })),
          catchError((err: HttpErrorResponse) => {
            return of(articleActions.getArticleError());
          })
        );
      })
    ),
  { functional: true }
);

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) =>
    actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ slug }: { slug: string }) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => articleActions.deleteArticleSuccess()),
          catchError((err: HttpErrorResponse) => {
            return of(articleActions.deleteArticleError());
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  {
    functional: true,
    dispatch: false,
  }
);
