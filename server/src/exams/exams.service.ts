import {
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from "@nestjs/common";
import { subDays } from "date-fns";
import { CoursesRepository } from "src/courses/courses.repository";
import { User } from "src/users/entities/users.entity";
import { FindOptionsOrder, In, MoreThan } from "typeorm";
import { CreateExamDto } from "./dtos/create-exam.dto";
import { Exam } from "./entities/exam.entity";
import { ExamsRepository } from "./exams.repository";

@Injectable()
export class ExamsService {
  constructor(
    private readonly coursesRepo: CoursesRepository,
    private readonly examsRepo: ExamsRepository,
  ) {}

  async getOf(examID: string) {
    return this.examsRepo.findOne({
      where: {
        id: examID,
      },
      loadEagerRelations: false,
      relations: {
        subject: {
          courses: {
            teachers: true,
          },
        },
        examinees: true,
        room: true,
      },
    });
  }

  async list(user: User, includePassed?: boolean) {
    const order: FindOptionsOrder<Exam> = {
      when: "ASC",
      subject: {
        name: "ASC",
      },
    };
    if (user.isAdmin) {
      return this.examsRepo.find({
        order,
        loadEagerRelations: false,
        relations: {
          subject: {
            courses: {
              teachers: true,
            },
          },
          examinees: true,
          room: true,
        },
      });
    }
    const courses = await this.coursesRepo.find({
      loadEagerRelations: false,
      relations: {
        subject: true,
        students: true,
      },
    });
    const subjects = courses
      .filter((c) => c.students.find((s) => s.email === user.email))
      .map((c) => c.subject);
    return this.examsRepo.find({
      order,
      loadEagerRelations: false,
      relations: {
        subject: true,
        examinees: true,
        room: true,
      },
      where: {
        subject: { id: In(subjects.map((s) => s.id)) },
        when: includePassed ? undefined : MoreThan(new Date()),
      },
    });
  }

  async joinExam(user: User, examID: string) {
    const exam = await this.examsRepo.findOne({
      where: {
        id: examID,
      },
      relations: {
        examinees: true,
        room: true,
        subject: false,
      },
    });
    if (exam.examinees.length >= exam.room.size) {
      throw new PreconditionFailedException("A vizsgaalkalom megtelt.");
    }
    if (subDays(exam.when, 1) <= new Date()) {
      throw new PreconditionFailedException(
        "Nem tudsz vizsgára jelentkezni a vizsga előtt egy nappal.",
      );
    }
    exam.examinees.push(user);
    return this.examsRepo.save(exam);
  }

  // TODO check if user is teacher of the subject
  async create(user: User, { room, subject, when }: CreateExamDto) {
    const exam = this.examsRepo.create({
      when,
      room: {
        id: room,
      },
      subject: {
        id: subject,
      },
    });
    return this.examsRepo.save(exam);
  }

  async get(id: string) {
    return this.examsRepo.findOne({ where: { id } });
  }

  async delete(id: string, user: User) {
    const exam = await this.examsRepo.findOne({
      where: { id },
      loadEagerRelations: false,
      relations: { subject: { courses: { teachers: true } } },
    });
    if (
      !user.isAdmin &&
      !exam.subject.courses
        .map((c) => c.teachers)
        .flat(1)
        .find((t) => t.email === user.email)
    ) {
      throw new ForbiddenException("Nincs jogod ehhez.");
    }
    return this.examsRepo.delete({ id });
  }
  async leave(id: string, user: User) {
    const exam = await this.examsRepo.findOne({
      where: { id },
      loadEagerRelations: false,
      relations: { examinees: true },
    });
    if (subDays(exam.when, 1) <= new Date()) {
      throw new PreconditionFailedException(
        "Nem tudsz vizsgáról lejelentkezni a vizsga előtt egy nappal.",
      );
    }
    exam.examinees = exam.examinees.filter((u) => u.email !== user.email);
    return this.examsRepo.save(exam);
  }
}
