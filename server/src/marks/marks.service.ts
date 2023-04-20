import { ForbiddenException, Injectable } from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { Semester } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/users.entity";
import { In } from "typeorm";
import { GiveMarkDto } from "./dtos/give-mark.dto";
import { MarksRepository } from "./marks.repository";

@Injectable()
export class MarksService {
  constructor(
    private readonly marksRepo: MarksRepository,
    private readonly courseRepo: CoursesRepository,
  ) {}

  async getMarks(courseId: string, user: User) {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      loadEagerRelations: false,
      relations: {
        students: true,
        teachers: true,
      },
    });
    if (!user.isAdmin && !course.teachers.find((t) => t.email === user.email)) {
      throw new ForbiddenException();
    }
    return this.marksRepo.find({
      where: {
        user: { email: In(course.students.map((s) => s.email)) },
      },
      loadEagerRelations: false,
      relations: {
        user: true,
        subject: true,
      },
    });
  }

  async giveMark(
    { course: courseId, mark, target }: GiveMarkDto,
    teacher: User,
  ) {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      loadEagerRelations: false,
      relations: {
        students: true,
        teachers: true,
        subject: true,
      },
    });
    if (
      !teacher.isAdmin &&
      !course.teachers.find((t) => t.email === teacher.email)
    ) {
      throw new ForbiddenException();
    }
    let m = await this.marksRepo.findOne({
      loadEagerRelations: false,
      relations: {
        user: true,
        subject: true,
      },
      where: {
        user: {
          email: target,
        },
        subject: {
          id: course.subject.id,
        },
      },
    });
    if (m == null) {
      m = this.marksRepo.create({
        mark,
        semester: Semester.SPRING, // TODO get from NOW()
        year: 2023,
        subject: course.subject,
        user: {
          email: target,
        },
      });
    }
    m.mark = mark;
    return this.marksRepo.save(m);
  }
}
