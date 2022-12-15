import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRlEnt } from 'src/modules/department-rl/modules/entities/department-rl.entity';
import { ReqEnt } from 'src/modules/req/modules/entities/req.entity';
import { DepartmentEnt } from './entities/department.entity';
import { DepartmentRepo } from './repositories/department.repository';
import { DepartmentService } from './services/department.service';
@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEnt,ReqEnt,DepartmentRlEnt])],
  providers: [DepartmentService, DepartmentRepo],
  exports: [DepartmentService],
})
export class DepartmentModule {}
