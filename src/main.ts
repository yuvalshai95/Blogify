import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './app/auth/ngrx/reducers';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), 
    provideStore(),
    provideState('auth', authReducer), 
    provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  })],
});
