import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonForumMsg } from "./common-forum-msg.entity";
import { CommonForumRepository } from "./common-forum.repository";
import { ForumMsg } from "./forum-msg.entity";
import { ForumRepository } from "./forum.repository";
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ForumMsg, CommonForumMsg])],
  providers: [ForumRepository, CommonForumRepository, ForumsService],
  exports: [ForumRepository, CommonForumRepository],
  controllers: [ForumsController],
})
export class ForumsModule {}
