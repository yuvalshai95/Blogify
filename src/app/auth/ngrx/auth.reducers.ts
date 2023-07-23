import { createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { IAuthState } from '../interfaces/auth-state.interface';
import * as authActions from './auth.actions';

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  user: null,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.register, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
  on(authActions.registerSuccess, (state, payload) => ({ ...state, isSubmitting: false, user: payload.user })),
  on(authActions.registerError, (state, payload) => ({
    ...state,
    isSubmitting: false,
    validationErrors: payload.errors,
  })),
  on(authActions.login, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
  on(authActions.loginSuccess, (state, payload) => ({ ...state, isSubmitting: false, user: payload.user })),
  on(authActions.loginError, (state, payload) => ({ ...state, isSubmitting: false, validationErrors: payload.errors })),
  on(authActions.getCurrentUser, (state) => ({ ...state, isLoading: true })),
  on(authActions.getCurrentUserSuccess, (state, payload) => ({ ...state, isLoading: false, user: payload.user })),
  on(authActions.getCurrentUserError, (state) => ({ ...state, isLoading: false, user: null })),
  on(routerNavigationAction, (state) => ({ ...state, validationErrors: null }))
);
