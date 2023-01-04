import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { ProjectEnt } from './entities/project.entity';
import { ProjectRepo } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectEnt, ReqEnt])],
  providers: [ProjectService, ProjectRepo],
  exports: [ProjectService],
})
export class ProjectModule {}
