import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { FeedComponent } from '../../../../shared/components/feed-main/feed/feed.component';
import { PopularTagsComponent } from '../../../../shared/components/popular-tags-main/popular-tags/popular-tags.component';

@Component({
  selector: 'bl-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent],
})
export class GlobalFeedComponent implements OnInit {
  public apiUrl: string = '/articles';
  constructor() {}

  ngOnInit() {}
}
