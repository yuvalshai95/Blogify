import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../auth/interfaces/auth-state.interface';
import { selectUser } from '../../auth/store/auth.selectors';
import { Observable, combineLatest, filter, take, tap } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/settings.reducers';
import { IBackendErrors } from '../..//shared/interfaces/backend-errors.interface';
import { BackendErrorMessagesComponent } from '../../shared/components/backend-error-messages/backend-error-messages.component';
import { logout, updateCurrentUser } from '../../auth/store/auth.actions';
import { IUserRequest } from '../../shared/interfaces/user-request.interface';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'bl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule, LoadingComponent],
})
export class SettingsComponent implements OnInit {
  public vm$!: Observable<{ isSubmitting: boolean; backendErrors: IBackendErrors | null }>;
  public currentUser?: IUser;
  public form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<IAuthState>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.setViewModel();
    this.setFormValues();
  }

  public setFormValues(): void {
    this.store
      .select(selectUser)
      .pipe(
        filter(Boolean), // filter out null and undefined
        take(1),
        tap((currentUser: IUser) => {
          this.currentUser = currentUser;
          this.initializeForm();
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  public setViewModel(): void {
    this.vm$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  public initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }

    this.form.setValue({
      image: this.currentUser?.image ?? '',
      username: this.currentUser?.username,
      bio: this.currentUser?.bio ?? '',
      email: this.currentUser?.email,
      password: '',
    });
  }

  public onSubmit(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }

    const currentUserRequest: IUserRequest = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };
    this.store.dispatch(updateCurrentUser({ currentUserRequest }));
  }

  public onLogout(): void {
    this.store.dispatch(logout());
  }
}
