import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mark } from "./entities/mark.entity";
import { MarksRepository } from "./marks.repository";
import { MarksController } from "./marks.controller";
import { MarksService } from "./marks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  providers: [MarksRepository, MarksService],
  exports: [MarksRepository],
  controllers: [MarksController],
})
export class MarksModule {}
