import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonNews } from "./common-news.entity";
import { News } from "./news.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CommonNews, News])],
})
export class NewsModule {}
