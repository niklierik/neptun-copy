import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Message } from "./entities/message.entity";
import { MessagingRepository } from "./messaging.repository";
import { MessagingService } from "./messaging.service";
import { MessagingController } from "./messaging.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  providers: [MessagingRepository, MessagingService],
  exports: [MessagingRepository],
  controllers: [MessagingController],
})
export class MessagingModule {}
