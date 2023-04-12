import { forwardRef, Module } from "@nestjs/common";
import { MajorsService } from "./majors.service";
import { MajorsController } from "./majors.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Major } from "./entities/majors.entity";
import { MajorsRepository } from "./majors.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  providers: [MajorsService, MajorsRepository],
  imports: [TypeOrmModule.forFeature([Major]), forwardRef(() => UsersModule)],
  controllers: [MajorsController],
  exports: [MajorsService, MajorsRepository],
})
export class MajorsModule {}
