import { userProfileActions } from './../store/user-profile.actions';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUserProfileState } from '../interfaces/user-profile-state.interface';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { BehaviorSubject, Observable, combineLatest, filter, map, startWith } from 'rxjs';
import { selectError, selectIsLoading, selectUserProfile } from '../store/user-profile.reducer';
import { selectUser } from '../../auth/store/auth.selectors';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../../shared/components/feed-main/feed/feed.component';

@Component({
  selector: 'bl-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly store: Store<IUserProfileState> = inject(Store);
  private readonly router: Router = inject(Router);

  public isCurrentUserProfile$!: Observable<boolean>;
  public vm$!: Observable<{
    isLoading: boolean;
    error: string | null;
    userProfile: IUserProfile | null;
    isCurrentUserProfile: boolean;
  }>;
  public slug: string = '';

  private feedApiUrlSubject = new BehaviorSubject<string>('');
  public feedApiUrl$ = this.feedApiUrlSubject.asObservable().pipe(filter((url) => !!url));

  public ngOnInit(): void {
    this.setIsCurrentUserProfile();
    this.setViewModel();
    this.setSlugFromRoute();
  }

  public getFeedApiUrl(): string {
    console.log('getFeedApiUrl slug', this.slug);
    const isFavorited = this.router.url.includes('favorites');
    return isFavorited ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
  }

  public setIsCurrentUserProfile(): void {
    this.isCurrentUserProfile$ = combineLatest({
      currentUser: this.store.select(selectUser).pipe(filter((user: IUser | undefined | null) => user !== undefined)),
      userProfile: this.store
        .select(selectUserProfile)
        .pipe(filter((userProfile: IUserProfile | null) => Boolean(userProfile))),
    }).pipe(map(({ currentUser, userProfile }) => currentUser?.username === userProfile?.username));
  }

  public setViewModel(): void {
    this.vm$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfile),
      isCurrentUserProfile: this.isCurrentUserProfile$,
    });
  }

  public setSlugFromRoute(): void {
    // no need to unsubscribe the router take care of it itself
    this.route.params.pipe().subscribe((params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
      this.feedApiUrlSubject.next(this.getFeedApiUrl());
    });
  }

  public fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }
}
