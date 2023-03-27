import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { CommonNews } from "./entities/common-news.entity";

@Injectable()
export class CommonNewsRepository extends Repository<CommonNews> {
  constructor(ds: DataSource) {
    super(CommonNews, ds.createEntityManager());
  }
}
