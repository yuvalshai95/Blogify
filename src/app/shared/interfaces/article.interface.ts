import { IProfile } from '../components/feed-main/feed/interfaces/profile.interface';
import { PopularTagType } from './popular-tag.type';

export interface IArticle {
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: PopularTagType[];
  title: string;
  updatedAt: string;
  author: IProfile;
}
