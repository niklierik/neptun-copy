import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { News } from "./news.entity";

@Injectable()
export class NewsRepository extends Repository<News> {
  constructor(ds: DataSource) {
    super(News, ds.createEntityManager());
  }
}
