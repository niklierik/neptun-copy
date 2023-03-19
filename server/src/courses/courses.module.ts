import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./course.entity";
import { CoursesRepository } from "./courses.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  exports: [CoursesRepository],
})
export class CoursesModule {}
