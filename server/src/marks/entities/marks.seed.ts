/**
 * Create marks for users that have picked an exam
 */

import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { Exam } from "src/exams/entities/exam.entity";
import { ExamsRepository } from "src/exams/exams.repository";
import { SubjectType } from "src/subjects/entities/subject-type.enum";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { User } from "src/users/entities/users.entity";
import { MarksRepository } from "../marks.repository";

export async function seedMarkForStudent(
  marks: MarksRepository,
  subjects: SubjectsRepository,
  exam: Exam,
  user: User,
) {
  const practice = await subjects.findOne({
    where: {
      name: exam.subject.name,
      type: SubjectType.PRACTICE,
    },
  });
  if (practice == null) {
    throw new Error(`Unable to find practice of subject ${exam.subject.name}.`);
  }
  const mark = marks.create({
    subject: practice,
    user,
    mark: faker.datatype.number({ min: 2, max: 5 }),
  });
  await marks.save(mark);
}

export async function seedMarksForExam(
  marks: MarksRepository,
  subjects: SubjectsRepository,
  exam: Exam,
) {
  await Promise.all(
    exam.examinees.map((student) =>
      seedMarkForStudent(marks, subjects, exam, student),
    ),
  );
}

export async function seedMarks(app: INestApplication) {
  const examsR = await app.resolve(ExamsRepository);
  const subjectsR = await app.resolve(SubjectsRepository);
  const exams = await examsR.find({
    loadEagerRelations: false,
    relations: {
      examinees: true,
      room: false,
      subject: {
        courses: false,
        forum: false,
        news: false,
      },
    },
  });
  const marks = await app.resolve(MarksRepository);
  await Promise.all(
    exams.map((exam) => seedMarksForExam(marks, subjectsR, exam)),
  );
}
