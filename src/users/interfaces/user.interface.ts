export interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  roles: Array<string>;
}