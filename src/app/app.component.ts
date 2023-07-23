import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { IAuthState } from './auth/interfaces/auth-state.interface';
import { Store } from '@ngrx/store';
import { getCurrentUser } from './auth/ngrx/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<IAuthState>) {}

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUser());
  }
}
