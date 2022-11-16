import { Module } from '@nestjs/common';
import { DepartmentModule } from '../modules/department.module';
import { DepartmentController } from './controller/department.controller';

@Module({
  imports: [DepartmentModule],
  controllers: [DepartmentController],
})
export class DepartmentCoreModule {}
