import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { CoursesRepository } from "./courses.repository";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { UsersModule } from "src/users/users.module";
import { RoomsModule } from "src/rooms/rooms.module";
import { SubjectsModule } from "src/subjects/subjects.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => UsersModule),
    RoomsModule,
    SubjectsModule,
  ],
  providers: [CoursesRepository, CoursesService],
  exports: [CoursesRepository, CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
