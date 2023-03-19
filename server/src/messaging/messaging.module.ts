import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Message } from "./message.entity";
import { MessagingRepository } from "./messaging.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  exports: [MessagingRepository],
})
export class MessagingModule {}
