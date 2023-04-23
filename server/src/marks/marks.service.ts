import {
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from "@nestjs/common";
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
      order: {
        user: {
          familyname: "ASC",
          forename: "ASC",
          email: "ASC",
        },
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

  async stats(course?: string, subject?: string) {
    if (course && subject) {
      throw new PreconditionFailedException(
        "A kurzus és a tantárgy szűrés is meg lett adva. Kérlek csak egyet adj meg!",
      );
    }
    let res;
    if (subject) {
      res = await this.marksRepo.query(
        `
        SELECT "m"."mark", COUNT("m"."mark") "noMarks" FROM "SYSTEM"."marks" "m" 
        INNER JOIN "SYSTEM"."users" "u" ON "m"."userEmail" = "u"."email" 
        INNER JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId" 
        INNER JOIN "SYSTEM"."courses" "c" ON "c"."subjectId"="s"."id"
        WHERE "s"."id" = :1
        GROUP BY "m"."mark"
        `,
        [subject],
      );
    } else if (course) {
      res = await this.marksRepo.query(
        `
        SELECT "m"."mark", COUNT("m"."mark") "noMarks" FROM "SYSTEM"."marks" "m" 
        INNER JOIN "SYSTEM"."users" "u" ON "m"."userEmail" = "u"."email" 
        INNER JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId" 
        INNER JOIN "SYSTEM"."courses" "c" ON "c"."subjectId"="s"."id"
        WHERE "c"."id" = :1
        GROUP BY "m"."mark"
        `,
        [course],
      );
    } else {
      res = await this.marksRepo.query(
        `
        SELECT "m"."mark", COUNT("m"."mark") "noMarks" FROM "SYSTEM"."marks" "m" 
        INNER JOIN "SYSTEM"."users" "u" ON "m"."userEmail" = "u"."email" 
        INNER JOIN "SYSTEM"."subjects" "s" ON "s"."id" = "m"."subjectId" 
        INNER JOIN "SYSTEM"."courses" "c" ON "c"."subjectId"="s"."id"
        GROUP BY "m"."mark"
        `,
      );
    }

    // Converting structure from
    // [{mark: 2, noMark: 12}]
    // to
    // { "2": 12 }
    const object = {};
    for (const element of res) {
      object[element.mark] = element.noMarks;
    }
    return object;
  }
}
