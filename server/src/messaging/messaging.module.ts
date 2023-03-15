import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Message } from "./message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
})
export class MessagingModule {}
