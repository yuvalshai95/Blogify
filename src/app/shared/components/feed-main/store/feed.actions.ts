import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IGetFeedResponse } from '../feed/interfaces/get-feed-response.interface';

export const feedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Get feed': props<{ url: string }>(),
    'Get feed success': props<{ feed: IGetFeedResponse }>(),
    'Get feed error': emptyProps(),
  },
});
