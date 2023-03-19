import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { NewsModule } from "./news.module";

@Injectable()
export class NewsRepository extends Repository<NewsModule> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
