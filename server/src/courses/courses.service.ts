import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { CoursesRepository } from "./courses.repository";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async list(user: User) {
    if (!user.isAdmin) {
      return this.getCourses(user.email);
    }
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

  async joinCourse(user: User, id: string) {
    const course = await this.coursesRepository.findOne({
      where: { id: id },
    });
    course.students.push(user);
    return this.coursesRepository.save(course);
  }
}
