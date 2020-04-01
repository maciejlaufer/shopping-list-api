import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Test } from '@nestjs/testing';

@Injectable()
export class UserSeedService {
  constructor(private readonly userServie: UsersService) {}
  async seed() {
    const users = await this.userServie.findAll();
    if (users.length === 0) {
      const user: CreateUserDto = {
        firstName: 'Test',
        lastName: 'Testowy',
        email: 'test@test.com',
        password: 'password',
      };
      await this.userServie.createUser(user, ['ADMIN']);
    }
    console.log('users', users);
  }
}
