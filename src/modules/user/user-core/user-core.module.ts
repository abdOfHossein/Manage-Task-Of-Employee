import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from 'src/modules/hash/hash.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { UserEnt } from '../modules/entities/user.entity';
import { UserModule } from '../modules/user.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEnt,RoleEnt]),UserModule, RedisModule.forRoot('192.168.10.200', 6379),
  HashModule],
  controllers: [UserController],
})
export class UserCoreModule {}
