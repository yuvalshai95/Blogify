import { createFeature, createReducer, on } from '@ngrx/store';
import { IFeedState } from '../feed/interfaces/feed-state.interface';
import { feedActions } from './feed.actions';
import { IGetFeedResponse } from '../feed/interfaces/get-feed-response.interface';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: IFeedState = {
  isLoading: false,
  error: null,
  feed: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state: IFeedState) => ({ ...state, isLoading: true })),
    on(feedActions.getFeedSuccess, (state: IFeedState, payload: { feed: IGetFeedResponse }) => ({
      ...state,
      isLoading: false,
      feed: payload.feed,
    })),
    on(feedActions.getFeedError, (state: IFeedState) => ({ ...state, isLoading: false })),
    on(routerNavigatedAction, () => initialState) // reset state between route changes to fix issue with feed not updating
  ),
});

// Selectors
export const { name: feedFeatureKey, reducer: feedReducer, selectIsLoading, selectError, selectFeed } = feedFeature;
