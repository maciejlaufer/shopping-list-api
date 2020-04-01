import { Module } from '@nestjs/common';
import { UserSeedService } from './user-seed.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class SeedsModule {}
