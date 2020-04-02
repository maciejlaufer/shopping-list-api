import { User } from 'src/users/model/user.model';

export interface LoginRequest {
  username: string;
  password: string;
  user: User;
}
