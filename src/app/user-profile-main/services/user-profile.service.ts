import { HttpClient } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { IGetUserProfileResponse } from '../interfaces/get-user-profile-response.interface';

@Inject({
  providedIn: 'root',
})
export class UserProfileService {
  private BASE_URL = 'https://api.realworld.io/api';
  private readonly http: HttpClient = inject(HttpClient);

  getUserProfile(slug: string): Observable<IUserProfile> {
    const url = `${this.BASE_URL}/profiles/${slug}`;
    return this.http.get<IGetUserProfileResponse>(url).pipe(
      map((response) => {
        return response.profile;
      })
    );
  }
}
