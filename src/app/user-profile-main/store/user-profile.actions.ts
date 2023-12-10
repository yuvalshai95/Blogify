import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { IUserProfile } from '../interfaces/user-profile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get User Profile': props<{ slug: string }>(),
    'Get User Profile success': props<{ userProfile: IUserProfile }>(),
    'Get User Profile error': emptyProps(),
  },
});
