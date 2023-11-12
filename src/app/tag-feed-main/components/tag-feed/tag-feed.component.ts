import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { FeedComponent } from '../../../shared/components/feed-main/feed/feed.component';
import { PopularTagsComponent } from '../../../shared/components/popular-tags-main/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'bl-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
})
export class TagFeedComponent implements OnInit {
  public apiUrl: string = '';
  tagName: string = '';

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit() {
    this.setApiUrlAndTagNameFromRoute();
  }

  public setApiUrlAndTagNameFromRoute() {
    // no need to unsubscribe the router take care of it itself
    this.route.params.pipe().subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
