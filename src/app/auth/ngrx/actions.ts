import { createAction, props } from '@ngrx/store';
import { IRegisterRequest } from '../interfaces/register.interface';

export const register = createAction(
    '[Auth] Register', 
    props<{ request: IRegisterRequest }>()
);
