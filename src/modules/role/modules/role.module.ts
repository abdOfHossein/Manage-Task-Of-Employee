import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  providers: [RoleService, RoleRepo],
  exports: [RoleService],
})
export class RoleModule {}
