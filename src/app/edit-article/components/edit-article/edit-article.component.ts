import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import type { IArticleFormValues } from '../../../shared/components/article-form/interfaces/article-form-values.interface';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';
import type { IEditArticleState } from '../../interfaces/edit-article-state.interface';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import type { IBackendErrors } from '../../../shared/interfaces/backend-errors.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from '../../store/edit-article.reducer';
import type { IArticleRequest } from 'src/app/shared/interfaces/article-request.interface';
import { editArticleActions } from '../../store/edit-article.actions';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../../../shared/interfaces/article.interface';

@Component({
  selector: 'bl-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  public slug: string = '';
  // public initialValues = {
  //   title: '',
  //   description: '',
  //   body: '',
  //   tagList: [],
  // };

  public initialValues$!: Observable<IArticleFormValues>;
  public vm$!: Observable<{
    isSubmitting: boolean;
    backendErrors: IBackendErrors | null;
    initialValues: IArticleFormValues;
    isLoading: boolean;
  }>;

  constructor(
    private readonly store: Store<IEditArticleState>,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));

    this.setInitialValues();
    this.setViewModel();
  }

  public setInitialValues(): void {
    this.initialValues$ = this.store.select(selectArticle).pipe(
      filter((article): article is IArticle => article !== null),
      map((article: IArticle) => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }))
    );
  }

  public setViewModel(): void {
    this.vm$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
      isLoading: this.store.select(selectIsLoading),
      initialValues: this.initialValues$,
    });
  }

  public onSubmit(articleFormValues: IArticleFormValues): void {
    const request: IArticleRequest = {
      article: articleFormValues,
    };
    this.store.dispatch(editArticleActions.updateArticle({ request, slug: this.slug }));
  }
}
