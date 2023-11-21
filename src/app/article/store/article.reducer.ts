import { articleActions } from './article.actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IArticleState } from '../interfaces/article.state.interface';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

const initialState: IArticleState = {
  isLoading: false,
  error: null,
  article: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, (state: IArticleState) => ({ ...state, isLoading: true })),
    on(articleActions.getArticleSuccess, (state: IArticleState, payload: { article: IArticle }) => ({
      ...state,
      isLoading: false,
      article: payload.article,
    })),
    on(articleActions.getArticleError, (state: IArticleState) => ({ ...state, isLoading: false })),
    on(routerNavigatedAction, () => initialState) // reset state between route changes to fix issue with article not updating
  ),
});

// Selectors
export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectArticle,
} = articleFeature;
