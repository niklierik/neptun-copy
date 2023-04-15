import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonNews } from "./entities/common-news.entity";
import { CommonNewsRepository } from "./common-news.repository";
import { News } from "./entities/news.entity";
import { NewsRepository } from "./news.repository";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { UsersModule } from "src/users/users.module";
import { SubjectsModule } from "src/subjects/subjects.module";
import { CoursesModule } from "src/courses/courses.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CommonNews, News]),
    UsersModule,
    SubjectsModule,
    CoursesModule,
  ],
  providers: [CommonNewsRepository, NewsRepository, NewsService],
  exports: [CommonNewsRepository, NewsRepository],
  controllers: [NewsController],
})
export class NewsModule {}
