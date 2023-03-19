import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Message } from "./message.entity";

@Injectable()
export class MessagingRepository extends Repository<Message> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
