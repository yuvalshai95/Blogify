import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PopularTagType } from '../../interfaces/popular-tag.type';

@Component({
  selector: 'bl-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor],
})
export class TagListComponent implements OnInit {
  @Input() tags: PopularTagType[] = [];

  constructor() {}

  ngOnInit() {}
}
