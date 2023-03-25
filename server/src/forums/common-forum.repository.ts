import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { CommonForumMsg } from "./common-forum-msg.entity";

@Injectable()
export class CommonForumRepository extends Repository<CommonForumMsg> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
