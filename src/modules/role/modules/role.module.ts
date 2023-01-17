import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { RoleEnt } from './entities/role.entity';
import { RoleRepo } from './repositories/role.repository';
import { RoleService } from './services/role.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEnt]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [RoleService, RoleRepo, HandlerService, TranslateService],
  exports: [RoleService],
})
export class RoleModule {}
