import { IUserProfile } from './user-profile.interface';

export interface IUserProfileState {
  userProfile: IUserProfile | null;
  isLoading: boolean;
  error: string | null;
}
