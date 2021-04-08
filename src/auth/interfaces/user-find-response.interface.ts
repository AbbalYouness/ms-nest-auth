import { IUser } from './user.interface';

export interface IUserFindResponse {
  status: number;
  message: string;
  user: IUser | null;
}
