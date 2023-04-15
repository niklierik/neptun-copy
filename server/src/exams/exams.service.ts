import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { User } from "src/users/entities/users.entity";
import { In } from "typeorm";
import { CreateExamDto } from "./dtos/create-exam.dto";
import { ExamsRepository } from "./exams.repository";

@Injectable()
export class ExamsService {
  constructor(
    private readonly coursesRepo: CoursesRepository,
    private readonly examsRepo: ExamsRepository,
  ) {}

  async list(user: User) {
    if (user.isAdmin) {
      return this.examsRepo.find({
        loadEagerRelations: false,
        relations: {
          subject: true,
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
      loadEagerRelations: false,
      relations: {
        subject: true,
        examinees: true,
        room: true,
      },
      where: {
        subject: In(subjects),
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
}
