import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEnt } from './entities/message.entity';
import { TaskRepo } from './repositories/message.repository';
import { TaskService } from './services/message.service';
import { ProjectModule } from "../../project/modules/project.module";
import { UserModule } from "../../user/modules/user.module";
import { UserService } from "../../user/modules/services/user.service";
import { ReqModule } from "../../req/modules/req.module";
import { DepartmentRlModule } from "../../department-rl/modules/department-rl.module";
import { UserRepo } from "../../user/modules/repositories/user.repository";
import { UserCoreModule } from "../../user/user-core/user-core.module";
@Module({
  imports: [UserModule, UserCoreModule, TypeOrmModule.forFeature([TaskEnt]),ProjectModule , ReqModule, DepartmentRlModule ],
  providers: [TaskService, TaskRepo],
  exports: [TaskService],
})
export class TaskModule {}
