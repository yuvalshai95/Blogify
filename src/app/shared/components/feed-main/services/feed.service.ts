import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFeedResponse } from '../feed/interfaces/get-feed-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private BASE_URL = 'https://api.realworld.io/api';
  constructor(private readonly http: HttpClient) {}

  getFeed(url: string): Observable<IGetFeedResponse> {
    const fullUrl = `${this.BASE_URL}${url}`;
    return this.http.get<IGetFeedResponse>(fullUrl);
  }
}
