import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { IRegisterRequest } from '../../interfaces/register.interface';
import { register } from '../../ngrx/actions';

@Component({
  selector: 'bl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule, RouterLink],
})
export class RegisterComponent implements OnInit {
  public icon = faFire
  constructor(private readonly store: Store) {}

  ngOnInit() {}

  onSubmit(formValues: { username: string; email: string; password: string }) {
    const request: IRegisterRequest = {
      user: { ...formValues },
    };
    this.store.dispatch(register({ request }));
  }
}
