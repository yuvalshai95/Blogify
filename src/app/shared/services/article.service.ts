import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IArticle } from '../interfaces/article.interface';
import { IArticleResponse } from '../interfaces/article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private BASE_URL = 'https://api.realworld.io/api';
  constructor(private readonly http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `${this.BASE_URL}/articles/${slug}`;
    return this.http.get<IArticleResponse>(fullUrl).pipe(map((res: IArticleResponse) => res.article));
  }
}
