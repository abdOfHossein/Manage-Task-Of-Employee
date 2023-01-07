import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEnt } from './entities/task.entity';
import { TaskRepo } from './repositories/task.repository';
import { TaskService } from './services/task.service';
import { ProjectModule } from "../../project/modules/project.module";
import { UserModule } from "../../user/modules/user.module";
import { UserService } from "../../user/modules/services/user.service";
import { ReqModule } from "../../req/modules/req.module";
import { DepartmentRlModule } from "../../department-rl/modules/department-rl.module";
import { UserRepo } from "../../user/modules/repositories/user.repository";
import { UserCoreModule } from "../../user/user-core/user-core.module";
import { UserEnt } from 'src/modules/user/modules/entities/user.entity';
import { RoleEnt } from 'src/modules/role/modules/entities/role.entity';
@Module({
  imports: [UserModule, UserCoreModule, TypeOrmModule.forFeature([TaskEnt,UserEnt,RoleEnt]),ProjectModule , ReqModule, DepartmentRlModule ],
  providers: [TaskService, TaskRepo],
  exports: [TaskService],
})
export class TaskModule {}
