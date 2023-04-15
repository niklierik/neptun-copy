import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async list() {
    return this.coursesRepository.find({
      relations: {
        room: true,
        subject: true,
        teachers: true,
        forum: false,
        news: false,
        students: false,
      },
    });
  }

  async getCourses(user: string): Promise<Course[]> {
    const courses = await this.coursesRepository.findFor(user);
    return courses;
  }

  async getCoursesOf(subject: string): Promise<Course[]> {
    return this.coursesRepository.find({
      where: {
        subject: {
          id: subject,
        },
      },
    });
  }
}
