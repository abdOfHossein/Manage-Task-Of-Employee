import { Module } from '@nestjs/common';
import { ProjectModule } from '../modules/project.module';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [ProjectModule],
  controllers: [ProjectController],
})
export class ProjectCoreModule {}
