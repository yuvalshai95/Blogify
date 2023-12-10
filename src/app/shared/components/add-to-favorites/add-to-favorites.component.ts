import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavritesAcions } from './store/add-to-favorites.actions';

@Component({
  selector: 'bl-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoritesComponent implements OnInit {
  @Input({ required: true }) isFavorited: boolean = false;
  @Input({ required: true }) favoritedCount: number = 0;
  @Input({ required: true }) articleSlug: string = '';

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {}

  public onLikeClick() {
    this.store.dispatch(
      addToFavritesAcions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );

    // optimistically update the UI
    this.favoritedCount = this.isFavorited ? this.favoritedCount - 1 : this.favoritedCount + 1;
    this.isFavorited = !this.isFavorited;
  }
}
