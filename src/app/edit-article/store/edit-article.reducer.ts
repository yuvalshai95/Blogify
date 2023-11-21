import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { IBackendErrors } from 'src/app/shared/interfaces/backend-errors.interface';
import { IEditArticleState } from '../interfaces/edit-article-state.interface';
import { editArticleActions } from './edit-article.actions';

const initialState: IEditArticleState = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(editArticleActions.getArticle, (state: IEditArticleState) => ({ ...state, isLoading: true })),
    on(editArticleActions.getArticleSuccess, (state: IEditArticleState, payload: { article: IArticle }) => ({
      ...state,
      isLoading: false,
      article: payload.article,
    })),
    on(editArticleActions.getArticleError, (state: IEditArticleState) => ({
      ...state,
      isLoading: false,
    })),
    on(editArticleActions.updateArticle, (state: IEditArticleState) => ({ ...state, isSubmitting: true })),
    on(editArticleActions.updateArticleSuccess, (state: IEditArticleState) => ({
      ...state,
      isSubmitting: false,
    })),
    on(editArticleActions.updateArticleError, (state: IEditArticleState, payload: { errors: IBackendErrors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: payload.errors,
    })),
    on(routerNavigatedAction, () => initialState) // reset state between route changes to fix issue with article not updating
  ),
});

// Selectors
export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = editArticleFeature;
