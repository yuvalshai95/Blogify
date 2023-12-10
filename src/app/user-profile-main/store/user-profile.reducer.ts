import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IUserProfileState } from '../interfaces/user-profile-state.interface';
import { userProfileActions } from './user-profile.actions';
import { IUserProfile } from '../interfaces/user-profile.interface';

const initialState: IUserProfileState = {
  isLoading: false,
  error: null,
  userProfile: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state: IUserProfileState) => ({ ...state, isLoading: true })),
    on(
      userProfileActions.getUserProfileSuccess,
      (state: IUserProfileState, payload: { userProfile: IUserProfile }) => ({
        ...state,
        isLoading: false,
        userProfile: payload.userProfile,
      })
    ),
    on(userProfileActions.getUserProfileError, (state: IUserProfileState) => ({ ...state, isLoading: false })),
    on(routerNavigatedAction, () => initialState) // reset state between route changes to fix issue with user profile not updating
  ),
});

// Selectors
export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectUserProfile,
} = userProfileFeature;
