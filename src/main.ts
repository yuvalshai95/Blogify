import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authReducer } from './app/auth/store/auth.reducers';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import * as authEffects from './app/auth/store/auth.effects';
import * as feedEffects from './app/shared/components/feed-main/store/feed.effects';
import * as popularTagsEffects from './app/shared/components/popular-tags-main/store/popular-tags.effects';
import * as addToFavoritesEffects from './app/shared/components/add-to-favorites/store/add-to-favorites.effects';
import { authInterceptor } from './app/shared/interceptors/auth-interceptor';
import { feedFeatureKey, feedReducer } from './app/shared/components/feed-main/store/feed.reducer';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/popular-tags-main/store/popular-tags.reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState('auth', authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects, feedEffects, popularTagsEffects, addToFavoritesEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
