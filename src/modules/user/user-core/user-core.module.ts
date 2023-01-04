import { Module } from '@nestjs/common';
import { HashModule } from 'src/modules/hash/hash.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { UserModule } from '../modules/user.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [UserModule, RedisModule.forRoot('192.168.10.200', 6379),
  HashModule],
  controllers: [UserController],
})
export class UserCoreModule {}
