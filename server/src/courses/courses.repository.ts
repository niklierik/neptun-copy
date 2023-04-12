import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(ds: DataSource) {
    super(Course, ds.createEntityManager());
  }

  async findFor(user: string) {
    let res = await this.find({
      loadEagerRelations: false,
      relations: {
        forum: false,
        news: false,
        room: true,
        students: true,
        teachers: true,
        subject: true,
      },
    });
    // TODO let dataabase filter these out
    res = res.filter(
      (c) =>
        Boolean(c.students.find((u) => u.email === user)) ||
        Boolean(c.teachers.find((u) => u.email === user)),
    );
    return res;
  }
}
