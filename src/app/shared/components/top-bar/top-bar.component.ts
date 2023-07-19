import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../../auth/interfaces/auth-state.interface';
import { Observable, combineLatest } from 'rxjs';
import { selectUser } from '../../../auth/ngrx/auth.selectors';
import { IUser } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faFire, faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TopBarItemComponent } from '../top-bar-item/top-bar-item.component';

@Component({
  selector: 'bl-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule, TopBarItemComponent],
})
export class TopBarComponent implements OnInit {
  public icons!: Record<string, IconDefinition>;
  public vm$!: Observable<{user: IUser | null | undefined}>;
  constructor(private store: Store<IAuthState>) {
  }

  public ngOnInit(): void {
    this.icons = {
      gear: faGear,
      new: faPenToSquare,
      fire: faFire,
    }
    this.vm$ = combineLatest({
      user: this.store.select(selectUser)
    })
  }

}