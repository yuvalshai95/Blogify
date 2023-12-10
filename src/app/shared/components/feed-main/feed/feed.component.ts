import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFeedState } from './interfaces/feed-state.interface';
import { Store } from '@ngrx/store';
import { feedActions } from '../store/feed.actions';
import { Observable, combineLatest } from 'rxjs';
import { selectError, selectFeed, selectIsLoading } from '../store/feed.reducer';
import { IGetFeedResponse } from './interfaces/get-feed-response.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { LoadingComponent } from '../../loading/loading.component';
import { environment } from 'src/environments/environment';
import { PaginationComponent } from '../../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../../tag-list/tag-list.component';
import { AddToFavoritesComponent } from '../../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'bl-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  public vm$!: Observable<{ isLoading: boolean; error: string | null; feed: IGetFeedResponse | null }>;
  public limit!: number;
  public baseUrl!: string;
  public currentPage: number = 0;

  @Input() apiUrl: string = '';

  constructor(
    private readonly store: Store<IFeedState>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('FeedComponent ngOnInit apiUrl', this.apiUrl);
    this.vm$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeed),
    });

    this.limit = environment.limit;
    this.baseUrl = this.router.url.split('?')[0];

    // no need to unsubscribe the router take care of it itself
    this.route.queryParams.pipe().subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  public fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
