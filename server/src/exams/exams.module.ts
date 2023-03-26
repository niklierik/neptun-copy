import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";
import { ExamsRepository } from "./exams.repository";
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamsRepository, ExamsService],
  exports: [ExamsRepository],
  controllers: [ExamsController],
})
export class ExamsModule {}
