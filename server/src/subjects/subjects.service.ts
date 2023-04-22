import { Injectable } from "@nestjs/common";
import { Course } from "src/courses/entities/course.entity";
import { SubjectsRepository } from "./subjects.repository";

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async list() {
    return this.subjectsRepository.find({
      order: { name: "ASC", type: "ASC", id: "ASC" },
    });
  }

  async get(id: string) {
    return this.subjectsRepository.findOne({
      where: { id },
      loadEagerRelations: false,
      relations: {
        courses: {
          room: true,
          subject: true,
          forum: false,
          news: false,
          students: false,
          teachers: false,
        },
      },
    });
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
          room: true,
          students: true,
          subject: true,
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
