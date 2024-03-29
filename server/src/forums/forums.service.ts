import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { User } from "src/users/entities/users.entity";
import { FindOptionsWhere } from "typeorm";
import { CommonForumRepository } from "./common-forum.repository";
import { CommonForumMsg } from "./entities/common-forum-msg.entity";
import { ForumMsg } from "./entities/forum-msg.entity";
import { ForumRepository } from "./forum.repository";

@Injectable()
export class ForumsService {
  constructor(
    private readonly forumsRepo: ForumRepository,
    private readonly commonForumsRepo: CommonForumRepository,
    private readonly subjectsRepo: SubjectsRepository,
    private readonly coursesRepo: CoursesRepository,
  ) {}

  async list(user: User, courseId?: string) {
    if (courseId == null && !user.isAdmin) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    const where: FindOptionsWhere<ForumMsg> = {};
    if (courseId != null) {
      where.course = {
        id: courseId,
      };
    }
    const forum = await this.forumsRepo.find({
      loadEagerRelations: false,
      order: {
        createdAt: "DESC",
      },
      relations: {
        sender: true,
        course: {
          forum: false,
          news: false,
          room: false,
          students: true,
          subject: true,
          teachers: true,
        },
      },
      where,
    });
    if (courseId == null) {
      return forum;
    }
    if (forum.length == 0) {
      return [];
    }
    if (
      !user.isAdmin &&
      !(
        forum[0].course.students.find((u) => u.email === user.email) ||
        forum[0].course.teachers.find((u) => u.email === user.email)
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return forum;
  }

  async listCommon(user: User, subjectId?: string) {
    if (subjectId == null && !user.isAdmin) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    const where: FindOptionsWhere<CommonForumMsg> = {};
    if (subjectId) {
      where.subject = {
        id: subjectId,
      };
    }
    const forum = await this.commonForumsRepo.find({
      loadEagerRelations: false,
      order: {
        createdAt: "DESC",
      },
      relations: {
        sender: true,
        subject: {
          courses: {
            students: true,
            teachers: true,
          },
        },
      },
      where,
    });
    if (subjectId == null) {
      return forum;
    }
    if (forum.length == 0) {
      return [];
    }
    if (
      !user.isAdmin &&
      !forum[0].subject.courses.find(
        (course) =>
          course.students.find((u) => u.email === user.email) != null ||
          course.teachers.find((u) => u.email === user.email) != null,
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return forum;
  }

  async post(user: User, courseId: string, message: string) {
    const course = await this.coursesRepo.findOne({
      loadEagerRelations: false,
      relations: {
        teachers: true,
      },
      where: {
        id: courseId,
      },
    });
    if (course == null) {
      throw new NotFoundException();
    }
    if (
      !user.isAdmin &&
      !(
        course.teachers.find((u) => u.email === user.email) != null ||
        course.students.find((u) => u.email === user.email) != null
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return this.forumsRepo.save(
      this.forumsRepo.create({
        message,
        course: {
          id: courseId,
        },
        sender: {
          email: user.email,
        },
      }),
    );
  }

  async postCommon(user: User, subjectId: string, message: string) {
    const subject = await this.subjectsRepo.findOne({
      loadEagerRelations: false,
      relations: {
        courses: {
          teachers: true,
        },
      },
      where: {
        id: subjectId,
      },
    });
    if (subject == null) {
      throw new NotFoundException();
    }
    if (
      !user.isAdmin &&
      !(
        subject.courses.find(
          (c) =>
            c.teachers.find((u) => u.email === user.email) != null ||
            c.students.find((u) => u.email === user.email) != null,
        ) != null
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return this.commonForumsRepo.save(
      this.commonForumsRepo.create({
        message,
        subject: {
          id: subjectId,
        },
        sender: {
          email: user.email,
        },
      }),
    );
  }
}
