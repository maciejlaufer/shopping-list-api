import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { MD5, SHA3 } from 'crypto-js';
import { UserRoles } from './user-roles';
import { User } from './model/user.model';
import { VerificationToken } from './model/verification-token.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('VerificationToken')
    private verificationTokenModel: Model<VerificationToken>,
  ) {}

  async createUser(
    createUserRequest: CreateUserDto,
    roles: Array<UserRoles>,
  ): Promise<User> {
    const existingUser = await this.findOne({ email: createUserRequest.email });
    if (existingUser) {
      throw new BadRequestException('User with that email already exists');
    }

    const user = {
      email: createUserRequest.email,
      username: createUserRequest.email,
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      roles: roles,
    } as User;
    this.setPassword(user, createUserRequest.password);

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async createVerificationToken(user: User): Promise<VerificationToken> {
    const verificationToken = {
      _userId: user._id,
      token: this.generateConfirmationToken(user),
    };

    const createdToken = new this.verificationTokenModel(verificationToken);
    return createdToken.save();
  }

  async findOne(user: Partial<User>): Promise<User> {
    const foundUser = await this.userModel.findOne(user);
    return foundUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find();
  }

  public validatePassword(user: User, password: string): boolean {
    return user && this.hashPassword(user, password) === user.password;
  }

  private generateConfirmationToken(user: User) {
    return MD5(
      `${user.email}-${new Date().valueOf()}`,
      `${new Date().valueOf()}`,
    ).toString();
  }

  private generateResetPasswordToken(user: User): string {
    const timestamp = new Date().valueOf();
    const token = `${timestamp}|${user.salt}`;

    return Buffer.from(token).toString('base64');
  }

  private validateResetPasswordToken(user: User): boolean {
    const validTimestamp = new Date()
      .setHours(new Date().getHours() - 1)
      .valueOf();

    const tokenTimestamp = Number(
      Buffer.from(user.resetPasswordToken, 'base64')
        .toString()
        .split('|')[0],
    );

    return validTimestamp <= tokenTimestamp;
  }

  private setPassword(user: User, password: string): void {
    user.salt = this.generateSaltForUser(user);
    user.password = this.hashPassword(user, password);
  }

  private hashPassword(user: User, password: string): string {
    return SHA3(password, user.salt).toString();
  }

  private generateSaltForUser(user: User) {
    return MD5(
      `${user.email}-${new Date().valueOf()}`,
      `${new Date().valueOf()}`,
    ).toString();
  }
}
