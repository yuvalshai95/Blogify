import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticleFormValues } from './interfaces/article-form-values.interface';
import { IBackendErrors } from '../../interfaces/backend-errors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bl-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, CommonModule],
})
export class ArticleFormComponent implements OnInit {
  public form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  @Input() initialValues?: IArticleFormValues;
  @Input() isSubmitting: boolean = false;
  @Input() errors: IBackendErrors | null = null;

  @Output() onArticleSubmit = new EventEmitter<IArticleFormValues>();

  constructor(private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }

    this.form.setValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  public onSubmit(): void {
    const formValues = this.form.getRawValue();
    const articleFormValues: IArticleFormValues = {
      ...formValues,
      tagList: formValues.tagList.split(' '),
    };
    this.onArticleSubmit.emit(articleFormValues);
  }
}
