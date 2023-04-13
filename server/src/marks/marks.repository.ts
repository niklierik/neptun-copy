import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Mark } from "./entities/mark.entity";

@Injectable()
export class MarksRepository extends Repository<Mark> {
  constructor(ds: DataSource) {
    super(Mark, ds.createEntityManager());
  }
}
