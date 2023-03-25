import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { ForumMsg } from "./forum-msg.entity";

@Injectable()
export class ForumRepository extends Repository<ForumMsg> {
  constructor(ds: DataSource) {
    super(ForumMsg, ds.createEntityManager());
  }
}
