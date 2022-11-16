import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from 'src/modules/hash/hash.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { UserEnt } from './entities/user.entity';
import { UserRepo } from './repositories/user.repository';
import { UserService } from './services/User.service';
@Module({
  imports: [
    HashModule,
    RedisModule.forRoot('127.0.0.1', 6379),
    TypeOrmModule.forFeature([UserEnt]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, UserRepo, JwtStrategy, JwtGuard],
  exports: [UserService],
})
export class UserModule {}
