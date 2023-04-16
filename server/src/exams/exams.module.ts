import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./entities/exam.entity";
import { ExamsRepository } from "./exams.repository";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";
import { UsersModule } from "src/users/users.module";
import { CoursesModule } from "src/courses/courses.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    forwardRef(() => UsersModule),
    CoursesModule,
  ],
  providers: [ExamsRepository, ExamsService],
  exports: [ExamsRepository],
  controllers: [ExamsController],
})
export class ExamsModule {}
