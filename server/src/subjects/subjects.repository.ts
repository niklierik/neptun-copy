import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Subject } from "./subject.entity";

@Injectable()
export class SubjectsRepository extends Repository<Subject> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
