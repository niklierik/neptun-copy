import { Module } from "@nestjs/common";
import { MarksModule } from "src/marks/marks.module";
import { UsersModule } from "src/users/users.module";
import { StudiesController } from "./studies.controller";
import { StudiesService } from "./studies.service";

@Module({
  imports: [MarksModule, UsersModule],
  controllers: [StudiesController],
  providers: [StudiesService],
})
export class StudiesModule {}
