import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEnt } from './entities/department.entity';
import { DepartmentRepo } from './repositories/department.repository';
import { DepartmentService } from './services/department.service';
@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEnt])],
  providers: [DepartmentService, DepartmentRepo],
  exports: [DepartmentService],
})
export class DepartmentModule {}
