import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { verificationTokenSchema } from './schemas/verification-token.schema';
import { UserExistsValidator } from './_validators/user-exists.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'VerificationToken', schema: verificationTokenSchema },
    ]),
  ],
  providers: [UsersService, UserExistsValidator],
  exports: [UsersService],
})
export class UsersModule {}
