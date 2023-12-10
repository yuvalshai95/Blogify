import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticle } from '../../../../shared/interfaces/article.interface';

export const addToFavritesAcions = createActionGroup({
  source: 'Add to favorites',
  events: {
    'Add to favorites': props<{ isFavorited: boolean; slug: string }>(),
    'Add to favorites success': props<{ article: IArticle }>(),
    'Add to favorites error': emptyProps(),
  },
});
