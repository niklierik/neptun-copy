import { Module } from "@nestjs/common";
import { MarksModule } from "src/marks/marks.module";
import { StudiesController } from "./studies.controller";
import { StudiesService } from "./studies.service";

@Module({
  imports: [MarksModule],
  controllers: [StudiesController],
  providers: [StudiesService],
})
export class StudiesModule {}
