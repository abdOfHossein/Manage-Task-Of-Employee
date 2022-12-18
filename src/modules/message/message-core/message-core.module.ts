import { Module } from "@nestjs/common";
import { MessageModule } from "../modules/message.module";
import { MessageController } from "./controller/message.controller";

@Module({
  imports: [MessageModule],
  controllers: [MessageController],
})
export class MessageCoreModule {}
