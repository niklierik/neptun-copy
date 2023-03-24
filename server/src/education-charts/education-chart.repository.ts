import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { EducationChart } from "./education-chart.entity";

@Injectable()
export class EducationChartsRepository extends Repository<EducationChart> {
  constructor(ds: DataSource) {
    super(EducationChart, ds.createEntityManager());
  }
}
