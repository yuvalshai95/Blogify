import { IArticle } from '../../../../interfaces/article.interface';

export interface IGetFeedResponse {
  articles: IArticle[];
  articlesCount: number;
}
