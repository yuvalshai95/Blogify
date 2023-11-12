import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'bl-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class FeedTogglerComponent implements OnInit {
  public currentUser$ = this.store.select(selectUser);
  @Input() tagName?: string;

  constructor(private readonly store: Store) {}

  public ngOnInit() {}
}
