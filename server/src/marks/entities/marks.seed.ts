/**
 * Create marks for users that have picked an exam
 */

import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { Exam } from "src/exams/entities/exam.entity";
import { ExamsRepository } from "src/exams/exams.repository";
import { User } from "src/users/entities/users.entity";
import { MarksRepository } from "../marks.repository";

export async function seedMarkForStudent(
  marks: MarksRepository,
  exam: Exam,
  user: User,
) {
  const practice = exam.subject.bridgePracticeLecture;
  const mark = marks.create({
    subject: practice,
    user,
    mark: faker.datatype.number({ min: 2, max: 5 }),
  });
  await marks.save(mark);
}

export async function seedMarksForExam(marks: MarksRepository, exam: Exam) {
  await Promise.all(
    exam.examinees.map((student) => seedMarkForStudent(marks, exam, student)),
  );
}

export async function seedMarks(app: INestApplication) {
  const examsR = await app.resolve(ExamsRepository);
  const exams = await examsR.find({
    loadEagerRelations: false,
    relations: {
      examinees: true,
      room: false,
      subject: {
        bridgePracticeLecture: {
          bridgePracticeLecture: false,
          courses: false,
          forum: false,
          news: false,
        },
        courses: false,
        forum: false,
        news: false,
      },
    },
  });
  const marks = await app.resolve(MarksRepository);
  await Promise.all(exams.map((exam) => seedMarksForExam(marks, exam)));
}
