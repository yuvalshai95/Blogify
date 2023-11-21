import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IArticleFormValues } from '../../../shared/components/article-form/interfaces/article-form-values.interface';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';
import { ICreateArticleState } from '../../interfaces/create-article-state.interface';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { IBackendErrors } from '../../../shared/interfaces/backend-errors.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/create-article.reducer';
import { IArticleRequest } from 'src/app/shared/interfaces/article-request.interface';
import { createArticleActions } from '../../store/create-article.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bl-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent implements OnInit {
  public initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  public vm$!: Observable<{ isSubmitting: boolean; backendErrors: IBackendErrors | null }>;

  constructor(private readonly store: Store<ICreateArticleState>) {}

  public ngOnInit(): void {
    this.setViewModel();
  }

  public setViewModel(): void {
    this.vm$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  public onSubmit(articleFormValues: IArticleFormValues): void {
    const request: IArticleRequest = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
