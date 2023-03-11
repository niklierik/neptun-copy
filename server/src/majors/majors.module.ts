import { Module } from "@nestjs/common";
import { MajorsService } from "./majors.service";
import { MajorsController } from "./majors.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Major } from "./entities/majors.entity";
import { MajorsRepository } from "./majors.repository";

@Module({
  providers: [MajorsService, MajorsRepository],
  imports: [TypeOrmModule.forFeature([Major])],
  controllers: [MajorsController],
  exports: [MajorsService],
})
export class MajorsModule {}
