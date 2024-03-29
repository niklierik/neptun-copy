import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./entities/subject.entity";
import { SubjectsRepository } from "./subjects.repository";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), UsersModule],
  providers: [SubjectsRepository, SubjectsService],
  exports: [SubjectsRepository, SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
