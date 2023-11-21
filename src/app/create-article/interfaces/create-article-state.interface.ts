import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';

export interface ICreateArticleState {
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}
