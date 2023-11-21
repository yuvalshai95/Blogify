import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private BASE_URL = 'https://api.realworld.io/api';

  constructor(private readonly http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${this.BASE_URL}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }
}
