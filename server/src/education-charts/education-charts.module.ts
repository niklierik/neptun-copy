import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationChart } from "./education-chart.entity";
import { EducationChartsRepository } from "./education-chart.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EducationChart])],
  providers: [EducationChartsRepository],
  exports: [EducationChartsRepository],
})
export class EducationChartsModule {}
