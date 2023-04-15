import { ForbiddenException, Injectable } from "@nestjs/common";
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
  ) {}

  async list(user: User, courseId?: string) {
    if (courseId == null && !user.isAdmin) {
      throw new ForbiddenException();
    }
    const where: FindOptionsWhere<ForumMsg> = {};
    if (courseId != null) {
      where.course = {
        id: courseId,
      };
    }
    const forum = await this.forumsRepo.find({
      loadEagerRelations: false,
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
      !(
        forum[0].course.students.find((u) => u.email === user.email) ||
        forum[0].course.teachers.find((u) => u.email === user.email)
      )
    ) {
      throw new ForbiddenException();
    }
    return forum;
  }

  async listCommon(user: User, subjectId?: string) {
    if (subjectId == null && !user.isAdmin) {
      throw new ForbiddenException();
    }
    const where: FindOptionsWhere<CommonForumMsg> = {};
    if (subjectId) {
      where.subject = {
        id: subjectId,
      };
    }
    const forum = await this.commonForumsRepo.find({
      loadEagerRelations: false,
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
      !forum[0].subject.courses.find(
        (course) =>
          course.students.find((u) => u.email === user.email) != null ||
          course.teachers.find((u) => u.email === user.email) != null,
      )
    ) {
      throw new ForbiddenException();
    }
    return forum;
  }
}
