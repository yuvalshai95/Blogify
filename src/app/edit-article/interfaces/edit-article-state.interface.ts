import { IArticle } from '../../shared/interfaces/article.interface';
import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';

export interface IEditArticleState {
  isLoading: boolean;
  article: IArticle | null;
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}
