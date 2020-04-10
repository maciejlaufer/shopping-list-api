import { Injectable, ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model/user.model';
import { LoginResponse } from './_responses/login.response';
import { RegisterRequest } from './_requests/register.request';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { VerificationToken } from 'src/users/model/verification-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ username });
    if (user) {
      const userValid = this.usersService.validatePassword(user, password);

      if (userValid) {
        return user;
      }
    }

    return null;
  }

  login(user: User): LoginResponse {
    if (!user.isVerified) {
      return {
        isVerified: false,
        accessToken: null,
      };
    }
    const payload = { username: user.username, sub: user._id };
    return {
      isVerified: true,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerRequest: RegisterRequest): Promise<void> {
    const newUser = {
      ...registerRequest,
    } as CreateUserDto;

    const user = await this.usersService.createUser(newUser, ['USER']);

    if (user) {
      const verificationToken = await this.usersService.createVerificationToken(
        user,
      );

      if (verificationToken) {
        this.sendVerificationEmail(user, verificationToken);
      }
    }
  }

  private async sendVerificationEmail(
    user: User,
    verificationToken: VerificationToken,
  ): Promise<void> {
    //
  }
}
