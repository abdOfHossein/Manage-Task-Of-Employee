import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEnt } from 'src/modules/file/modules/entities/file.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { ProjectEnt } from './entities/project.entity';
import { ProjectRepo } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectEnt, ReqEnt, FileEnt])],
  providers: [ProjectService, ProjectRepo, HandlerService, TranslateService],
  exports: [ProjectService],
})
export class ProjectModule {}
