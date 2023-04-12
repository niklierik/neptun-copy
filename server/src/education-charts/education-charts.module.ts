import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationChart } from "./education-chart.entity";
import { EducationChartsRepository } from "./education-chart.repository";
import { EducationChartsService } from "./education-charts.service";
import { EducationChartsController } from "./education-charts.controller";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationChart]),
    forwardRef(() => UsersModule),
  ],
  providers: [EducationChartsRepository, EducationChartsService],
  exports: [EducationChartsRepository],
  controllers: [EducationChartsController],
})
export class EducationChartsModule {}
