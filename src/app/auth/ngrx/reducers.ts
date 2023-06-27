import { createReducer, on } from "@ngrx/store";
import { IAuthState } from "../interfaces/auth-state.interface";
import { register } from "./actions";

const initialState: IAuthState = {
    isSubmitting: false
}

export const authReducer = createReducer(
    initialState,
    on(register, (state) => ({ ...state, isSubmitting: true })),
)