import { ObjectID } from 'mongodb';

export class User {
  id: ObjectID;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  resetPasswordToken: string;
  roles: Array<string>;
  isVerified: boolean;
}
