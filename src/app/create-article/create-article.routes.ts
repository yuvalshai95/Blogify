import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateArticleService } from './services/create-article.service';
import * as createArticleEffects from './store/create-article.effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { createArticleFeatureKey, createArticleReducer } from './store/create-article.reducer';

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
