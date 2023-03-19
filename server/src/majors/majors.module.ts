import { Module } from "@nestjs/common";
import { MajorsService } from "./majors.service";
import { MajorsController } from "./majors.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Major } from "./entities/majors.entity";
import { MajorsRepository } from "./majors.repository";
import { PassportModule } from "@nestjs/passport";

@Module({
  providers: [MajorsService, MajorsRepository],
  imports: [
    TypeOrmModule.forFeature([Major]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  controllers: [MajorsController],
  exports: [MajorsService],
})
export class MajorsModule {}
