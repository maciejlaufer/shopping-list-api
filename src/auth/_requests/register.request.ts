import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsUserExist } from 'src/users/_validators/user-exists.validator';

export class RegisterRequest {
  @IsUserExist({
    message: 'User with this email already exists',
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
