import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { FileManagerEnt } from '../modules/entities/file-manager.entity';
import { FileManagerModule } from '../modules/file-manager.module';
import { FileManagerController } from './controller/file-manager.controller';

@Module({
  imports: [FileManagerModule,TypeOrmModule.forFeature([FileManagerEnt,UserEnt,RoleEnt])],
  controllers: [FileManagerController],
})
export class FileManagerCoreModule {}
