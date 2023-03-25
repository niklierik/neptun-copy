import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { SubjectsRepository } from "./subjects.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsRepository],
  exports: [SubjectsRepository],
})
export class SubjectsModule {}
