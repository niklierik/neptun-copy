import { Injectable } from "@nestjs/common";
import { Course } from "src/courses/entities/course.entity";
import { SubjectsRepository } from "./subjects.repository";

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async list() {
    return this.subjectsRepository.find({});
  }

  async get(id: string) {
    return this.subjectsRepository.findOne({ where: { id } });
  }

  async getCourses(subjectID: string): Promise<Course[]> {
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
    return subject.courses;
  }
}
