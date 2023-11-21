import { Route } from '@angular/router';
import { ArticleComponent } from './components/article.component';
import { provideEffects } from '@ngrx/effects';
import * as articleEffects from './store/article.effects';
import { articleFeatureKey, articleReducer } from './store/article.reducer';
import { provideState } from '@ngrx/store';
import { ArticleService } from './services/article.service';

export const articleRoutes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    // provide article store only when article page is up, no need for article store in main.ts it does not need to be shareable upon initial app load
    providers: [provideEffects(articleEffects), provideState(articleFeatureKey, articleReducer), ArticleService],
  },
];
