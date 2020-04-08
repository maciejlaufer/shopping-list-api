import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { UserExistsValidator } from 'src/users/_validators/user-exists.validator';

export class RegisterRequest {
  @Validate(UserExistsValidator, {
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
