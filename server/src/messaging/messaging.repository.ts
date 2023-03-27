import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagingRepository extends Repository<Message> {
  constructor(ds: DataSource) {
    super(Message, ds.createEntityManager());
  }
}
