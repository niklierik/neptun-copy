import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Exam } from "./exam.entity";

@Injectable()
export class ExamsRepository extends Repository<Exam> {
  constructor(ds: DataSource) {
    super(Exam, ds.createEntityManager());
  }
}
