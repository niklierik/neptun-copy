import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonNews } from "./common-news.entity";
import { CommonNewsRepository } from "./common-news.repository";
import { News } from "./news.entity";
import { NewsRepository } from "./news.repository";
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommonNews, News])],
  providers: [CommonNewsRepository, NewsRepository, NewsService],
  exports: [CommonNewsRepository, NewsRepository],
  controllers: [NewsController],
})
export class NewsModule {}
