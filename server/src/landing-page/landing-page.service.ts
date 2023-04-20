import { Injectable } from "@nestjs/common";
import { CoursesService } from "src/courses/courses.service";
import { Semester } from "src/courses/entities/course.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { SubjectsService } from "src/subjects/subjects.service";
import { User } from "src/users/entities/users.entity";
import {
  CoursesOfSemester,
  LandingPage,
  SubjectAndCourses,
} from "./interfaces/landing-page.interface";

@Injectable()
export class LandingPageService {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly subjectsService: SubjectsService,
  ) {}

  private findOrCreateSemester(
    year: number,
    semester: Semester,
    semesters: CoursesOfSemester[],
  ) {
    let res = semesters.find((s) => s.year === year && s.semester === semester);
    if (res == null) {
      res = {
        semester,
        year,
        subjects: [],
      };
      semesters.push(res);
    }
    return res;
  }

  private async findOrCreateSubject(
    subject: Subject,
    subjects: SubjectAndCourses[],
    user: User,
  ) {
    let res = subjects.find((s) => s.subject.id === subject.id);
    if (res == null) {
      const courses = await this.subjectsService.getCourses(subject.id);
      res = {
        courses: [],
        one: courses.length < 2,
        subject,
        teacher:
          user.email === "sysadmin" ||
          courses.find((c) => c.teachers.find((t) => t.email == user.email)) !=
            null,
      };
      subjects.push(res);
    }
    return res;
  }

  async get(user: User): Promise<LandingPage> {
    const courses = await this.coursesService.getCourses(user.email);
    const semesters: CoursesOfSemester[] = [];
    for (const course of courses) {
      const semester = this.findOrCreateSemester(
        course.year,
        course.semester,
        semesters,
      );
      const subject = await this.findOrCreateSubject(
        course.subject,
        semester.subjects,
        user,
      );
      subject.courses.push(course);
    }
    return { semesters };
  }
}
