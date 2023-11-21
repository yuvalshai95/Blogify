import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IArticleState } from '../interfaces/article.state.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articleActions } from '../store/article.actions';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { IArticle } from '../../shared/interfaces/article.interface';
import { selectArticle, selectError, selectIsLoading } from '../store/article.reducer';
import { IUser } from '../../shared/interfaces/user.interface';
import { selectUser } from 'src/app/auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { TagListComponent } from '../../shared/components/tag-list/tag-list.component';

@Component({
  selector: 'bc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent, TagListComponent],
})
export class ArticleComponent implements OnInit {
  public slug!: string;
  public isAuthor$!: Observable<boolean>;
  public vm$!: Observable<{ isLoading: boolean; error: string | null; article: IArticle | null; isAuthor: boolean }>;

  constructor(
    private readonly store: Store<IArticleState>,
    private readonly route: ActivatedRoute
  ) {
    this.setSlug();
  }

  public ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    this.setIsAuthor();
    this.setViewModel();
  }

  public setIsAuthor(): void {
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticle),
      currentUser: this.store
        .select(selectUser)
        .pipe(filter((currentUser): currentUser is IUser | null => currentUser !== undefined)),
    }).pipe(
      map(({ article, currentUser }: { article: IArticle | null; currentUser: IUser | null }) => {
        if (!article || !currentUser) {
          return false;
        }

        return article.author.username === currentUser.username;
      })
    );
  }

  public setViewModel(): void {
    this.vm$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticle),
      isAuthor: this.isAuthor$,
    });
  }

  public setSlug(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
  }

  public deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
