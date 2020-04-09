import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Req,
  Body,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './_guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './_guards/jwt-auth.guard';
import { LoginRequest } from './_requests/login.request';
import { AuthService } from './auth.service';
import { RegisterRequest } from './_requests/register.request';
import { ObjectId } from 'mongodb';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() body: RegisterRequest) {
    await this.authService.register(body);
    return 'User registered successfully';
  }

  @Get('profile')
  getProfile(@Request() req) {
    return 'Profile';
  }
}
