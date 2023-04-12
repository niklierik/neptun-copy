import { Injectable } from "@nestjs/common";
import { Repository, DataSource, ArrayContains } from "typeorm";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(ds: DataSource) {
    super(Course, ds.createEntityManager());
  }

  async findFor(user: string) {
    return this.find({
      relations: {
        forum: false,
        news: false,
        room: true,
        students: true,
        teachers: true,
        subject: true,
      },
      where: [
        { teachers: ArrayContains([{ email: user }]) },
        { students: ArrayContains([{ email: user }]) },
      ],
    });
  }
}
