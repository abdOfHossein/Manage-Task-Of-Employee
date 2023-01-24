import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEnt } from 'src/modules/department/modules/entities/department.entity';
import { DepartmentRepo } from 'src/modules/department/modules/repositories/department.repository';
import { DepartmentService } from 'src/modules/department/modules/services/department.service';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { DepartmentRlEnt } from './entities/department-rl.entity';
import { DepartmentRlRepo } from './repositories/department-rl.repository';
import { DepartmentRlService } from './services/department-rl.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentRlEnt])],
  providers: [DepartmentRlService, DepartmentRlRepo,HandlerService,TranslateService],
  exports: [DepartmentRlService],
})
export class DepartmentRlModule {}
