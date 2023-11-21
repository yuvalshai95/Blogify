import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IPopularTagsState } from '../interfaces/popular-tags-state.interface';
import { Store } from '@ngrx/store';
import { popularTagsActions } from '../store/popular-tags.actions';
import { PopularTagType } from '../../../interfaces/popular-tag.type';
import { Observable, combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTagsData } from '../store/popular-tags.reducers';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bl-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  public vm$!: Observable<{ isLoading: boolean; error: string | null; popularTags: PopularTagType[] | null }>;

  constructor(private readonly store: Store<IPopularTagsState>) {}

  public ngOnInit(): void {
    this.vm$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      popularTags: this.store.select(selectPopularTagsData),
    });
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
