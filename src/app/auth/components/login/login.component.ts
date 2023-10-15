import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../store/auth.selectors';
import { IAuthState } from '../../interfaces/auth-state.interface';
import { Store } from '@ngrx/store';
import { ILoginRequest } from '../../interfaces/login.interface';
import { login } from '../../store/auth.actions';

@Component({
  selector: 'bl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule, RouterLink, BackendErrorMessagesComponent],
})
export class LoginComponent implements OnInit {
  public icon: IconDefinition = faFire;
  public vm$!: Observable<any>;

  constructor(private readonly store: Store<IAuthState>) {}

  ngOnInit() {
    this.vm$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(formValues: { email: string; password: string }) {
    const request: ILoginRequest = {
      user: { ...formValues },
    };
    this.store.dispatch(login({ request }));
  }
}
