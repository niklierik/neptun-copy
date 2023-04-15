import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { FindOptionsWhere } from "typeorm";
import { CommonNewsRepository } from "./common-news.repository";
import { CommonNews } from "./entities/common-news.entity";
import { News } from "./entities/news.entity";
import { NewsRepository } from "./news.repository";

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepo: NewsRepository,
    private readonly commonNewsRepo: CommonNewsRepository,
  ) {}

  async list(user: User, courseId?: string) {
    if (courseId == null && !user.isAdmin) {
      throw new ForbiddenException();
    }
    const where: FindOptionsWhere<News> = {};
    if (courseId != null) {
      where.course = {
        id: courseId,
      };
    }
    const news = await this.newsRepo.find({
      loadEagerRelations: false,
      relations: {
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
      return news;
    }
    if (news.length == 0) {
      return [];
    }
    if (
      !(
        news[0].course.students.find((u) => u.email === user.email) ||
        news[0].course.teachers.find((u) => u.email === user.email)
      )
    ) {
      throw new ForbiddenException();
    }
    return news;
  }

  async listCommon(user: User, subjectId?: string) {
    if (subjectId == null && !user.isAdmin) {
      throw new ForbiddenException();
    }
    const where: FindOptionsWhere<CommonNews> = {};
    if (subjectId) {
      where.subject = {
        id: subjectId,
      };
    }
    const news = await this.commonNewsRepo.find({
      relations: {
        subject: true,
      },
    });
    if (subjectId == null) {
      return news;
    }
    if (news.length == 0) {
      return [];
    }
    if (
      !news[0].subject.courses.find(
        (course) =>
          course.students.find((u) => u.email === user.email) != null ||
          course.teachers.find((u) => u.email === user.email) != null,
      )
    ) {
      throw new ForbiddenException();
    }
    return news;
  }
}
