import { PopularTagType } from 'src/app/shared/interfaces/popularTag.type';

export interface IPopularTagsState {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
