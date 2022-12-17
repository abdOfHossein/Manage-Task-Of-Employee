import { Module } from "@nestjs/common";
import { TaskModule } from "../modules/message.module";
import { TaskController } from "./controller/message.controller";

@Module({
  imports: [TaskModule],
  controllers: [TaskController],
})
export class TaskCoreModule {}
