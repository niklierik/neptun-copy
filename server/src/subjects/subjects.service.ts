import { Injectable } from "@nestjs/common";
import { Course, Semester } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/users.entity";
import { FindOptionsOrder, In } from "typeorm";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { EditSubjectDto } from "./dto/edit-subject.dto";
import { Subject } from "./entities/subject.entity";
import { SubjectsRepository } from "./subjects.repository";

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async list(user: User) {
    const relations = {
      courses: {
        room: true,
        teachers: true,
        subject: true,
        students: true,
      },
    };
    const order: FindOptionsOrder<Subject> = {
      name: "ASC",
      type: "ASC",
      id: "ASC",
      courses: {
        year: "DESC",
        semester: "DESC",
        dayOfWeek: "ASC",
        startAt: "ASC",
      },
    };
    if (user.isAdmin) {
      return this.subjectsRepository.find({
        loadEagerRelations: false,
        order,
        relations,
      });
    }
    return this.subjectsRepository.find({
      loadEagerRelations: false,
      where: {
        courses: {
          year: 2023,
          semester: Semester.SPRING,
        },
        educhart: {
          major: {
            majorID: In([user.major.majorID, "", null]),
          },
        },
      },
      order,
      relations: { ...relations, educhart: { major: true } },
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
        },
      },
    });
  }

  async getCourses(subjectID: string): Promise<Course[]> {
    const subject = await this.subjectsRepository.findOne({
      where: {
        id: subjectID,
      },
      loadEagerRelations: false,
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

  async create(create: CreateSubjectDto) {
    return this.subjectsRepository.save(this.subjectsRepository.create(create));
  }

  async edit(edit: EditSubjectDto) {
    return this.subjectsRepository.update(
      { id: edit.id },
      {
        ...edit,
      },
    );
  }

  async delete(id: string) {
    return this.subjectsRepository.delete({ id });
  }
}
