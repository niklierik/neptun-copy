import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Course } from "./course.entity";

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(ds: DataSource) {
    super(Course, ds.createEntityManager());
  }
}
