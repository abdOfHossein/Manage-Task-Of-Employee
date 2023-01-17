import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { HandlerModule } from 'src/utility/handler/handler.module';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { DepartmentEnt } from './entities/department.entity';
import { DepartmentRepo } from './repositories/department.repository';
import { DepartmentService } from './services/department.service';
@Module({
  imports: [
    HandlerModule,
    TypeOrmModule.forFeature([DepartmentEnt, ReqEnt, DepartmentRlEnt]),
  ],
  providers: [DepartmentService, DepartmentRepo, HandlerService,TranslateService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
