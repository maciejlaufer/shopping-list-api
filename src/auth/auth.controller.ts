import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './_guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './_guards/jwt-auth.guard';
import { LoginRequest } from './_requests/login.request';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: LoginRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // return req.user;
    return 'Profile';
  }
}
