import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticle } from '../../shared/interfaces/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: IArticle }>(),
    'Get article error': emptyProps(),

    'Delete article': props<{ slug: string }>(),
    'Delete article success': emptyProps(),
    'Delete article error': emptyProps(),
  },
});
