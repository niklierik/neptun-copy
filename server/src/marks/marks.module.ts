import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mark } from "./mark.entity";
import { MarksRepository } from "./marks.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  providers: [MarksRepository],
  exports: [MarksRepository],
})
export class MarksModule {}
