import { IUser } from './user.interface';

interface IPassword {
  password: string;
}

export interface IUserRequest {
  user: IUser & IPassword;
}
