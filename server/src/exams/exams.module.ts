import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";
import { ExamsRepository } from "./exams.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamsRepository],
  exports: [ExamsRepository],
})
export class ExamsModule {}
