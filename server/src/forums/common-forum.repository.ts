import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { CommonForumMsg } from "./entities/common-forum-msg.entity";

@Injectable()
export class CommonForumRepository extends Repository<CommonForumMsg> {
  constructor(ds: DataSource) {
    super(CommonForumMsg, ds.createEntityManager());
  }
}
