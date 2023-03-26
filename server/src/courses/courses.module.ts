import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { CoursesRepository } from "./courses.repository";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesRepository, CoursesService],
  exports: [CoursesRepository],
  controllers: [CoursesController],
})
export class CoursesModule {}
