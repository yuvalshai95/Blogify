export interface IRegisterRequest {
  user: IRegisterUserDetails;
}

export interface IRegisterUserDetails {
  username: string;
  email: string;
  password: string;
}
