import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Mark } from "./mark.entity";

@Injectable()
export class MarksRepository extends Repository<Mark> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
