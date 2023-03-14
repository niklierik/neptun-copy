import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonForumMsg } from "./common-forum-msg.entity";
import { ForumMsg } from "./forum-msg.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ForumMsg, CommonForumMsg])],
})
export class ForumsModule {}
