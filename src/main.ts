import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authReducer } from './app/auth/ngrx/auth.reducers';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import * as authEffects from './app/auth/ngrx/auth.effects';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), 
    provideHttpClient(),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState('auth', authReducer), 
    provideEffects(authEffects),
    provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  })],
});
