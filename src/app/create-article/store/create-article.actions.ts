import { createActionGroup, props } from '@ngrx/store';
import { IArticle } from '../../shared/interfaces/article.interface';
import { IArticleRequest } from '../../shared/interfaces/article-request.interface';
import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{ request: IArticleRequest }>(),
    'Create article success': props<{ article: IArticle }>(),
    'Create article error': props<{ errors: IBackendErrors }>(),
  },
});
