import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonForumMsg } from "./entities/common-forum-msg.entity";
import { CommonForumRepository } from "./common-forum.repository";
import { ForumMsg } from "./entities/forum-msg.entity";
import { ForumRepository } from "./forum.repository";
import { ForumsService } from "./forums.service";
import { ForumsController } from "./forums.controller";
import { UsersModule } from "src/users/users.module";
import { CoursesModule } from "src/courses/courses.module";
import { SubjectsModule } from "src/subjects/subjects.module";

@Module({
  imports: [
    SubjectsModule,
    CoursesModule,
    TypeOrmModule.forFeature([ForumMsg, CommonForumMsg]),
    UsersModule,
  ],
  providers: [ForumRepository, CommonForumRepository, ForumsService],
  exports: [ForumRepository, CommonForumRepository],
  controllers: [ForumsController],
})
export class ForumsModule {}
