import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagType } from 'src/app/shared/interfaces/popular-tag.type';
import { IPopularTagsResponse } from '../interfaces/popular-tags.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  private BASE_URL = 'https://api.realworld.io/api';

  constructor(private readonly http: HttpClient) {}

  public getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = `${this.BASE_URL}/tags`;
    return this.http.get<IPopularTagsResponse>(fullUrl).pipe(map((res: IPopularTagsResponse) => res.tags));
  }
}
