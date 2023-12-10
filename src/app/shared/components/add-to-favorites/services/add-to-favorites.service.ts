import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IArticleResponse } from 'src/app/shared/interfaces/article-response.interface';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  private BASE_URL = 'https://api.realworld.io/api';
  private readonly http: HttpClient = inject(HttpClient);

  public addToFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug);
    return this.http.post<IArticleResponse>(url, {}).pipe(map(this.getArticle));
  }

  public removeFromFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug);
    return this.http.delete<IArticleResponse>(url).pipe(map(this.getArticle));
  }

  private getUrl(slug: string): string {
    return `${this.BASE_URL}/articles/${slug}/favorite`;
  }

  private getArticle(response: IArticleResponse): IArticle {
    return response.article;
  }
}
