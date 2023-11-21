import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticleRequest } from '../../shared/interfaces/article-request.interface';
import { IArticle } from '../../shared/interfaces/article.interface';
import { Observable, map } from 'rxjs';
import { IArticleResponse } from 'src/app/shared/interfaces/article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  private BASE_URL = 'https://api.realworld.io/api';

  constructor(private readonly http: HttpClient) {}

  public updateArticle(articleRequest: IArticleRequest, slug: string): Observable<IArticle> {
    const fullUrl = `${this.BASE_URL}/articles/${slug}`;
    return this.http.put<IArticleResponse>(fullUrl, articleRequest).pipe(map((res: IArticleResponse) => res.article));
  }
}
