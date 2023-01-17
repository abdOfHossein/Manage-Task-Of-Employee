import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { HandlerService } from 'src/utility/handler/handler.service';
import { TranslateService } from 'src/utility/translate/translate.service';
import { DepartmentRlModule } from '../../department-rl/modules/department-rl.module';
import { ProjectModule } from '../../project/modules/project.module';
import { ReqModule } from '../../req/modules/req.module';
import { UserModule } from '../../user/modules/user.module';
import { UserCoreModule } from '../../user/user-core/user-core.module';
import { TaskEnt } from './entities/task.entity';
import { TaskRepo } from './repositories/task.repository';
import { TaskService } from './services/task.service';
@Module({
  imports: [
    UserModule,
    UserCoreModule,
    TypeOrmModule.forFeature([TaskEnt, UserEnt, RoleEnt]),
    ProjectModule,
    ReqModule,
    DepartmentRlModule,
  ],
  providers: [TaskService, TaskRepo, HandlerService, TranslateService],
  exports: [TaskService],
})
export class TaskModule {}
