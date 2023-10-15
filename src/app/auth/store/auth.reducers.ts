import { createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { IAuthState } from '../interfaces/auth-state.interface';
import * as authActions from './auth.actions';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IBackendErrors } from 'src/app/shared/interfaces/backend-errors.interface';

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  user: null,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.register, (state: IAuthState) => ({ ...state, isSubmitting: true, validationErrors: null })),
  on(authActions.registerSuccess, (state: IAuthState, payload: { user: IUser }) => ({
    ...state,
    isSubmitting: false,
    user: payload.user,
  })),
  on(authActions.registerError, (state: IAuthState, payload: { errors: IBackendErrors }) => ({
    ...state,
    isSubmitting: false,
    validationErrors: payload.errors,
  })),
  on(authActions.login, (state: IAuthState) => ({ ...state, isSubmitting: true, validationErrors: null })),
  on(authActions.loginSuccess, (state: IAuthState, payload: { user: IUser }) => ({
    ...state,
    isSubmitting: false,
    user: payload.user,
  })),
  on(authActions.loginError, (state: IAuthState, payload: { errors: IBackendErrors }) => ({
    ...state,
    isSubmitting: false,
    validationErrors: payload.errors,
  })),
  on(authActions.getCurrentUser, (state: IAuthState) => ({ ...state, isLoading: true })),
  on(authActions.getCurrentUserSuccess, (state: IAuthState, payload) => ({
    ...state,
    isLoading: false,
    user: payload.user,
  })),
  on(authActions.getCurrentUserError, (state: IAuthState) => ({ ...state, isLoading: false, user: null })),
  on(routerNavigationAction, (state: IAuthState) => ({ ...state, validationErrors: null }))
);
