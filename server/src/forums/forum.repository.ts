import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { ForumMsg } from "./forum-msg.entity";

@Injectable()
export class ForumRepository extends Repository<ForumMsg> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
