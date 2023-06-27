import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
})
export class RegisterComponent implements OnInit {
  public icon = faFire
  constructor() {}

  ngOnInit() {}

  onSubmit(formValues: { username: string; email: string; password: string }) {
    // const request: RegisterRequest = {
    //   user: { ...formValues },
    // };
    // this.store.dispatch(registerAction({ request }));
  }
}
