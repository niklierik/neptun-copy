import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Mark } from "./mark.entity";

@Injectable()
export class MarksRepository extends Repository<Mark> {
  constructor(ds: DataSource) {
    super(Mark, ds.createEntityManager());
  }
}
