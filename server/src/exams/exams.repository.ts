import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Exam } from "./exam.entity";

@Injectable()
export class ExamsRepository extends Repository<Exam> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
