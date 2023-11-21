import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticle } from '../../shared/interfaces/article.interface';
import { IArticleRequest } from '../../shared/interfaces/article-request.interface';
import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';

export const editArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: IArticle }>(),
    'Get article error': emptyProps(),

    'Update article': props<{ request: IArticleRequest; slug: string }>(),
    'Update article success': props<{ article: IArticle }>(),
    'Update article error': props<{ errors: IBackendErrors }>(),
  },
});
