import { Injectable } from "@nestjs/common";
import { Major } from "src/majors/entities/majors.entity";
import { Repository, DataSource } from "typeorm";
import { Course } from "./course.entity";

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(ds: DataSource) {
    super(Major, ds.createEntityManager());
  }
}
