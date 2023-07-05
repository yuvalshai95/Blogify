import { IBackendErrors } from '../../shared/interfaces/backend-errors.interface';
import { IUser } from '../../shared/interfaces/user.interface';

export interface IAuthState {
    isSubmitting: boolean;
    user: IUser | null | undefined;
    isLoading: boolean;
    validationErrors: IBackendErrors | null;
}