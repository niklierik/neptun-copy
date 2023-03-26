import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";

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
}
