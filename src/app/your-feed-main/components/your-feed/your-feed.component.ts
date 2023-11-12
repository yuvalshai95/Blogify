import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { FeedComponent } from '../../../shared/components/feed-main/feed/feed.component';
import { PopularTagsComponent } from '../../../shared/components/popular-tags-main/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'bl-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
})
export class YourFeedComponent implements OnInit {
  public apiUrl: string = '/articles/feed';

  ngOnInit() {}
}
