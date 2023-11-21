import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { ICreateArticleState } from '../interfaces/create-article-state.interface';
import { createArticleActions } from './create-article.actions';
import { IBackendErrors } from 'src/app/shared/interfaces/backend-errors.interface';

const initialState: ICreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state: ICreateArticleState) => ({ ...state, isSubmitting: true })),
    on(createArticleActions.createArticleSuccess, (state: ICreateArticleState, payload: { article: IArticle }) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleError, (state: ICreateArticleState, payload: { errors: IBackendErrors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: payload.errors,
    })),
    on(routerNavigatedAction, () => initialState) // reset state between route changes to fix issue with article not updating
  ),
});

// Selectors
export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
