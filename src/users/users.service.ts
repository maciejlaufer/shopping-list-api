import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { MD5, SHA3 } from 'crypto-js';
import { UserRoles } from './user-roles';
import { ObjectID } from 'mongodb';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(
    createUserRequest: CreateUserDto,
    roles: Array<UserRoles>,
  ): Promise<User> {
    const existingUser = await this.findOneByEmail(createUserRequest.email);
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

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findOneById(id: ObjectID): Promise<User> {
    return this.userModel.findOneById(id);
  }

  async findOne(user: object): Promise<User> {
    return this.userModel.findOne(user);
  }

  async findAll(): Promise<Array<User>> {
    return this.userModel.find().exec();
  }

  public validatePassword(user: User, password: string): boolean {
    return user && this.hashPassword(user, password) === user.password;
  }

  private generateResetPasswordToken(user: User): string {
    const timestamp = new Date().valueOf();
    const token = `${timestamp}|${this.generateSaltForUser(user)}`;

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
