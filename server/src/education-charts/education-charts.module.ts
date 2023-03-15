import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationChart } from "./education-chart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EducationChart])],
})
export class EducationChartsModule {}
