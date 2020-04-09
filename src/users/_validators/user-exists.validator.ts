import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'userExists', async: true })
export class IsUserExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const user = await this.usersService.findOne({
      [validationArguments.property]: text,
    });
    return !user;
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistValidator,
    });
  };
}
