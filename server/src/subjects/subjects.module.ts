import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./entities/subject.entity";
import { SubjectsRepository } from "./subjects.repository";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { UsersModule } from "src/users/users.module";
import { CoursesModule } from "src/courses/courses.module";

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), CoursesModule, UsersModule],
  providers: [SubjectsRepository, SubjectsService],
  exports: [SubjectsRepository, SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
