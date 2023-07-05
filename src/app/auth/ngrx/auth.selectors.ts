import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth-state.interface';

export const selectAuthState = createFeatureSelector<IAuthState>('auth');

export const selectIsSubmitting = createSelector(selectAuthState, (state: IAuthState) => state.isSubmitting);
export const selectIsLoading = createSelector(selectAuthState, (state: IAuthState) => state.isLoading);
export const selectUser = createSelector(selectAuthState, (state: IAuthState) => state.user);
export const selectValidationErrors = createSelector(selectAuthState, (state: IAuthState) => state.validationErrors);
