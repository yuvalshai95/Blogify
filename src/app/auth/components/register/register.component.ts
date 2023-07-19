import { BackendErrorMessagesComponent } from './../../../shared/components/backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faFire } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { IBackendErrors } from 'src/app/shared/interfaces/backend-errors.interface';
import { IAuthState } from '../../interfaces/auth-state.interface';
import { IRegisterRequest } from '../../interfaces/register.interface';
import { register } from '../../ngrx/auth.actions';
import { selectIsSubmitting, selectValidationErrors } from '../../ngrx/auth.selectors';

@Component({
  selector: 'bl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule, RouterLink, BackendErrorMessagesComponent],
})
export class RegisterComponent implements OnInit {
  public icon: IconDefinition = faFire;
  public vm$!: Observable<{isSubmitting: boolean, backendErrors: IBackendErrors | null}>;
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<IBackendErrors | null>;

  constructor(private readonly store: Store<IAuthState>) {}

  ngOnInit() {
    this.vm$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    })
  }

  onSubmit(formValues: { username: string; email: string; password: string }) {
    const request: IRegisterRequest = {
      user: { ...formValues },
    };
    this.store.dispatch(register({ request }));
  }
}
