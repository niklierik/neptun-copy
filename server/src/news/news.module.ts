import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonNews } from "./common-news.entity";
import { CommonNewsRepository } from "./common-news.repository";
import { News } from "./news.entity";
import { NewsRepository } from "./news.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CommonNews, News])],
  exports: [CommonNewsRepository, NewsRepository],
})
export class NewsModule {}
