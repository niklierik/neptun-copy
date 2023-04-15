import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { Course, Semester } from "src/courses/entities/course.entity";
import { FindOptionsWhere } from "typeorm";
import { SubjectsRepository } from "./subjects.repository";

@Injectable()
export class SubjectsService {
  constructor(
    private readonly coursesRepo: CoursesRepository,
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  getSemester(semester?: string) {
    if (!semester) {
      return undefined;
    }
    switch (semester.toLocaleLowerCase()) {
      case "0":
      case "fall":
      case "tavasz":
        return Semester.FALL;
      case "1":
      case "spring":
      case "osz":
      case "ősz":
        return Semester.SPRING;
    }
  }

  getYear(year?: string) {
    if (year == null) {
      return undefined;
    }
    const ret = Number(year);
    if (isNaN(ret)) {
      return undefined;
    }
    return ret;
  }

  getWhere(yearStr?: string, semesterStr?: string) {
    const semester = this.getSemester(semesterStr);
    const year = this.getYear(yearStr);
    const where: FindOptionsWhere<Course> = {};
    where.semester = semester;
    where.year = year;
    return where;
  }

  async list(yearStr?: string, semesterStr?: string) {
    const where = this.getWhere(yearStr, semesterStr);
    const courses = await this.coursesRepo.find({
      where,
    });
    return courses.map((c) => c.subject);
  }

  async getCourses(
    subjectID: string,
    yearStr?: string,
    semesterStr?: string,
  ): Promise<Course[]> {
    const semester = this.getSemester(semesterStr);
    const year = this.getYear(yearStr);
    const subject = await this.subjectsRepository.findOne({
      where: {
        id: subjectID,
      },
      relations: {
        courses: {
          forum: false,
          news: false,
          room: false,
          students: false,
          subject: false,
          teachers: true,
        },
      },
    });
    if (subject == null) {
      return [];
    }
    return subject.courses.filter(
      (c) =>
        (year == null || year === c.year) &&
        (semester == null || semester === c.semester),
    );
  }
}
