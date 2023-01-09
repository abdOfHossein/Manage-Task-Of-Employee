import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { ReqEnt } from '../modules/entities/file-manager.entity';
import { ReqModule } from '../modules/req.module';
import { ReqController } from './controller/req.controller';

@Module({
  imports: [ReqModule,TypeOrmModule.forFeature([ReqEnt,UserEnt,RoleEnt])],
  controllers: [ReqController],
})
export class ReqCoreModule {}
