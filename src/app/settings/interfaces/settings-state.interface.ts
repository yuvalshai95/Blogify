import { IBackendErrors } from '../..//shared/interfaces/backend-errors.interface';

export interface ISettingsState {
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}
