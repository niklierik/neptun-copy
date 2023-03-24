import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Subject } from "./subject.entity";

@Injectable()
export class SubjectsRepository extends Repository<Subject> {
  constructor(ds: DataSource) {
    super(Subject, ds.createEntityManager());
  }
}
