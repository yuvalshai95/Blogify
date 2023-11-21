import { IArticle } from 'src/app/shared/interfaces/article.interface';

export interface IArticleState {
  isLoading: boolean;
  error: string | null;
  article: IArticle | null;
}
