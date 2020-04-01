export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  resetPasswordToken: string;
  roles: Array<string>;
}
