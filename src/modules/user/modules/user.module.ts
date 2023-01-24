import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { HashModule } from 'src/utility/hash/hash.module';
import { RedisModule } from 'src/utility/redis/redis.module';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { UserEnt } from './entities/user.entity';
import { RolesGuard } from './guard/role.guard';
import { UserRepo } from './repositories/user.repository';
import { UserService } from './services/User.service';
@Module({
  imports: [
    HashModule,
    RedisModule.forRoot('192.168.10.200', 6379),
    TypeOrmModule.forFeature([UserEnt, FileEnt, RoleEnt, DepartmentEnt]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    UserService,
    UserRepo,
    JwtStrategy,
    JwtGuard,
    RolesGuard,
    HandlerService,
    TranslateService,
  ],
  exports: [UserService],
})
export class UserModule {}
