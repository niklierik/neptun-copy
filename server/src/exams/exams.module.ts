import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";

@Module({ imports: [TypeOrmModule.forFeature([Exam])] })
export class ExamsModule {}
