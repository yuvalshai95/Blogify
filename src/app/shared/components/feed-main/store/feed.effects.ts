import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedService } from '../services/feed.service';
import { inject } from '@angular/core';
import { feedActions } from './feed.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { IGetFeedResponse } from '../feed/interfaces/get-feed-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) =>
    actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }: { url: string }) => {
        return feedService.getFeed(url).pipe(
          map((feed: IGetFeedResponse) => feedActions.getFeedSuccess({ feed })),
          catchError((err: HttpErrorResponse) => {
            return of(feedActions.getFeedError());
          })
        );
      })
    ),
  { functional: true }
);
