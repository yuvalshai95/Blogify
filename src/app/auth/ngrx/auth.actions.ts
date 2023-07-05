import { createAction, emptyProps, props } from '@ngrx/store';
import { IRegisterRequest } from '../interfaces/register.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';

export const register = createAction('[Auth] Register', props<{ request: IRegisterRequest }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{ user: IUser }>());

export const registerError = createAction('[Auth] Register Error', props<{ errors: IBackendErrors }>());
