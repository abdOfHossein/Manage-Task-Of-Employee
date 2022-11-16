import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { UserEnt } from './entities/user.entity';

import { UserRepo } from './repositories/user.repository';
import { UserService } from './services/User.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEnt]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, UserRepo, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
