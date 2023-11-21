import { PopularTagType } from 'src/app/shared/interfaces/popular-tag.type';

export interface IPopularTagsState {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
