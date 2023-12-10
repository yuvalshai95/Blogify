import { Route } from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { settingsKey, settingsReducer } from './store/settings.reducers';
import { provideState } from '@ngrx/store';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsKey, settingsReducer)],
  },
];
