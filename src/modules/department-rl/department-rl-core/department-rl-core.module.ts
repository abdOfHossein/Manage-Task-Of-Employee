import { Module } from '@nestjs/common';
import { DepartmentRlModule } from '../modules/department-rl.module';
import { DepartmentRlController } from './controller/project.controller';

@Module({
  imports: [DepartmentRlModule],
  controllers: [DepartmentRlController],
})
export class DepartmentRlCoreModule {}
