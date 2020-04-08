import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'userExists', async: false })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const user = await this.usersService.findOne({
      [validationArguments.property]: text,
    });
    return !user;
  }
}
