import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEnt } from './entities/project.entity';
import { ProjectRepo } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectEnt])],
  providers: [ProjectService, ProjectRepo],
  exports: [ProjectService],
})
export class ProjectModule {}
