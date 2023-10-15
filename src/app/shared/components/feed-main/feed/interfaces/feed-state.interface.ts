import { IGetFeedResponse } from './get-feed-response.interface';

export interface IFeedState {
  isLoading: boolean;
  error: string | null;
  feed: IGetFeedResponse | null;
}
