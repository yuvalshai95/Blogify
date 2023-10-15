import { createFeature, createReducer, on } from '@ngrx/store';
import { IPopularTagsState } from '../interfaces/popular-tags-state.interface';
import { popularTagsActions } from './popular-tags.actions';
import { PopularTagType } from 'src/app/shared/interfaces/popularTag.type';

const initialState: IPopularTagsState = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getPopularTags, (state: IPopularTagsState) => ({ ...state, isLoading: true })),
    on(
      popularTagsActions.getPopularTagsSuccess,
      (state: IPopularTagsState, payload: { popularTags: PopularTagType[] }) => ({
        ...state,
        isLoading: false,
        data: payload.popularTags,
      })
    ),
    on(popularTagsActions.getPopularTagsError, (state: IPopularTagsState) => ({ ...state, isLoading: false }))
  ),
});

// Selectors
export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature;
