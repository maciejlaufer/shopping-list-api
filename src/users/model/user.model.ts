import { ObjectID } from 'mongodb';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: ObjectID;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: Array<string>;

  @Field(() => Boolean)
  isVerified: boolean;

  password: string;
  salt: string;
  resetPasswordToken: string;
}
