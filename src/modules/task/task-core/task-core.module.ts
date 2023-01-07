import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEnt } from "src/modules/role/modules/entities/role.entity";
import { UserEnt } from "src/modules/user/modules/entities/user.entity";
import { TaskModule } from "../modules/task.module";
import { TaskController } from "./controller/task.controller";

@Module({
  imports: [TaskModule,TypeOrmModule.forFeature([UserEnt,RoleEnt])],
  controllers: [TaskController],
})
export class TaskCoreModule {}
