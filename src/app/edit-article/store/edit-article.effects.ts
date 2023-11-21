import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import type { IArticleRequest } from '../../shared/interfaces/article-request.interface';
import type { IArticle } from 'src/app/shared/interfaces/article.interface';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { editArticleActions } from './edit-article.actions';
import { EditArticleService } from '../services/edit-article.service';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(SharedArticleService)) =>
    actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }: { slug: string }) => {
        return articleService.getArticle(slug).pipe(
          map((article: IArticle) => editArticleActions.getArticleSuccess({ article })),
          catchError((err: HttpErrorResponse) => {
            return of(editArticleActions.getArticleError());
          })
        );
      })
    ),
  { functional: true }
);

export const updateArticleEffect = createEffect(
  (actions$ = inject(Actions), editArticleService = inject(EditArticleService)) =>
    actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ request, slug }: { request: IArticleRequest; slug: string }) => {
        return editArticleService.updateArticle(request, slug).pipe(
          map((article: IArticle) => editArticleActions.updateArticleSuccess({ article })),
          catchError((err: HttpErrorResponse) => {
            return of(editArticleActions.updateArticleError({ errors: err.error.errors }));
          })
        );
      })
    ),
  { functional: true }
);

export const redirectAfterUpdateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({ article }: { article: IArticle }) => {
        router.navigate(['/article', article.slug]);
      })
    ),
  {
    functional: true,
    dispatch: false,
  }
);
