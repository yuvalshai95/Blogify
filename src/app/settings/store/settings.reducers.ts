import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ISettingsState } from '../interfaces/settings-state.interface';
import * as authActions from '../../auth/store/auth.actions';
import { IBackendErrors } from 'src/app/shared/interfaces/backend-errors.interface';

const initialState: ISettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state: ISettingsState) => ({ ...state, isSubmitting: true })),
    on(authActions.updateCurrentUserSuccess, (state: ISettingsState) => ({ ...state, isSubmitting: false })),
    on(authActions.updateCurrentUserError, (state: ISettingsState, payload: { errors: IBackendErrors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: payload.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

//selectors
export const {
  name: settingsKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature;
