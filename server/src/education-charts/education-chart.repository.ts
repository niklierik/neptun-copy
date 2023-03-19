import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { EducationChart } from "./education-chart.entity";

@Injectable()
export class EducationChartsRepository extends Repository<EducationChart> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
