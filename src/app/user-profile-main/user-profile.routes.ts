import { Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile.component';
import { provideState } from '@ngrx/store';
import { userProfileFeatureKey, userProfileReducer } from './store/user-profile.reducer';
import * as UserProfileEffects from './store/user-profile.effects';
import { provideEffects } from '@ngrx/effects';
import { UserProfileService } from './services/user-profile.service';

export const userProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(UserProfileEffects),
    ],
  },
];
