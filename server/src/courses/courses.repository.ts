import { Injectable } from "@nestjs/common";
import { Repository, DataSource, FindOptionsOrder } from "typeorm";
import { Course } from "./entities/course.entity";

export const defaultConstOrder: FindOptionsOrder<Course> = {
  year: "DESC",
  semester: "DESC",
  subject: {
    name: "ASC",
    type: "ASC",
  },
  dayOfWeek: "ASC",
  startAt: "ASC",
};

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(ds: DataSource) {
    super(Course, ds.createEntityManager());
  }

  async findFor(user: string, order?: FindOptionsOrder<Course>) {
    order ??= defaultConstOrder;
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
      order,
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
