import { createAction, emptyProps, props } from '@ngrx/store';
import { IRegisterRequest } from '../interfaces/register.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';
import { ILoginRequest } from '../interfaces/login.interface';

export const register = createAction('[Auth] Register', props<{ request: IRegisterRequest }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: IUser }>());
export const registerError = createAction('[Auth] Register Error', props<{ errors: IBackendErrors }>());

export const login = createAction('[Auth] Login', props<{ request: ILoginRequest }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: IUser }>());
export const loginError = createAction('[Auth] Login Error', props<{ errors: IBackendErrors }>());


export const getCurrentUser = createAction('[Auth] Get Current User');
export const getCurrentUserSuccess = createAction('[Auth] Get Current User Success', props<{ user: IUser }>());
export const getCurrentUserError = createAction('[Auth] Get Current User Error');