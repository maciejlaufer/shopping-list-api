import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './model/user.model';
import { ObjectID, ObjectId } from 'mongodb';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('_id') id: string): Promise<User> {
    return await this.usersService.findOne({ _id: new ObjectId(id) });
  }
}
