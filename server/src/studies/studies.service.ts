import { Injectable } from "@nestjs/common";
import { Semester } from "src/courses/entities/course.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { MarksRepository } from "src/marks/marks.repository";
import { User } from "src/users/entities/users.entity";

@Injectable()
export class StudiesService {
  constructor(private readonly marksRepository: MarksRepository) {}

  async listStudies(user: User) {
    const marks = await this.marksRepository.find({
      loadEagerRelations: false,
      where: {
        user,
      },
      relations: {
        subject: true,
        user: true,
      },
    });
    const data = new Map<number, Map<Semester, Mark[]>>();
    for (const mark of marks) {
      let map = data.get(mark.year);
      if (map == null) {
        map = new Map<Semester, Mark[]>();
      }
      let array = map.get(mark.semester);
      if (array == null) {
        array = [];
      }
      array.push(mark);
      map.set(mark.semester, array);
      data.set(mark.year, map);
    }
    return data;
  }
}
