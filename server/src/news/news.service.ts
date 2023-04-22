import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { SubjectsRepository } from "src/subjects/subjects.repository";
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
    private readonly subjectsRepo: SubjectsRepository,
    private readonly coursesRepo: CoursesRepository,
  ) {}

  async list(user: User, courseId?: string) {
    if (courseId == null && !user.isAdmin) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    const where: FindOptionsWhere<News> = {};
    if (courseId != null) {
      where.course = {
        id: courseId,
      };
    }
    const news = await this.newsRepo.find({
      loadEagerRelations: false,
      order: {
        createdAt: "DESC",
      },
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
      !user.isAdmin &&
      !(
        news[0].course.students.find((u) => u.email === user.email) ||
        news[0].course.teachers.find((u) => u.email === user.email)
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
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
      order: {
        createdAt: "DESC",
      },
      relations: {
        subject: true,
      },
      loadEagerRelations: false,
    });
    if (subjectId == null) {
      return news;
    }
    if (news.length == 0) {
      return [];
    }
    if (
      !user.isAdmin &&
      !news[0].subject.courses.find(
        (course) =>
          course.students.find((u) => u.email === user.email) != null ||
          course.teachers.find((u) => u.email === user.email) != null,
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return news;
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
    if (!(course.teachers.find((t) => t.email === user.email) != null)) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return this.newsRepo.save(
      this.newsRepo.create({
        course: {
          id: courseId,
        },
        content: message,
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
      !(
        subject.courses.find(
          (c) => c.teachers.find((t) => t.email === user.email) != null,
        ) != null
      )
    ) {
      throw new ForbiddenException("Nincs jogod ehhez!");
    }
    return this.commonNewsRepo.save(
      this.commonNewsRepo.create({
        subject: {
          id: subjectId,
        },
        content: message,
      }),
    );
  }
}
