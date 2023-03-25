import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonForumMsg } from "./common-forum-msg.entity";
import { CommonForumRepository } from "./common-forum.repository";
import { ForumMsg } from "./forum-msg.entity";
import { ForumRepository } from "./forum.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ForumMsg, CommonForumMsg])],
  providers: [ForumRepository, CommonForumRepository],
  exports: [ForumRepository, CommonForumRepository],
})
export class ForumsModule {}
