import { faker } from "@faker-js/faker/locale/hu";
import { INestApplication } from "@nestjs/common";
import { CoursesRepository } from "src/courses/courses.repository";
import { Room } from "src/rooms/room.entity";
import { RoomsRepository } from "src/rooms/rooms.repository";
import { SubjectType } from "src/subjects/entities/subject-type.enum";
import { Subject } from "src/subjects/entities/subject.entity";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { User } from "src/users/entities/users.entity";
import { ExamsRepository } from "../exams.repository";
import * as _ from "lodash";

export interface CommonParams {
  exams: ExamsRepository;
  subjects: SubjectsRepository;
  courses: CoursesRepository;
  lectures: Subject[];
  rooms: Room[];
}

export async function createExamForSubject(
  common: CommonParams,
  subject: Subject,
) {
  const when = faker.date.between("2023-05-15T08:00:00", "2023-07-04T19:00:00");
  when.setHours(faker.datatype.number({ min: 8, max: 19 }), 0, 0, 0);
  let students: User[] = [];
  for (const course of subject.courses) {
    students = [...students, ...course.students];
  }
  students = _.shuffle(students);
  const exam = common.exams.create({
    room: common.rooms[
      faker.datatype.number({ min: 0, max: common.rooms.length - 1 })
    ],
    subject,
    when,
    examinees: [],
  });

  const count = 1 + Math.random() * 2;
  for (let i = 0; i < count && i < students.length; i++) {
    exam.examinees.push(students[i]);
  }
  await common.exams.save(exam);
}

export async function seedExams(app: INestApplication) {
  const exams = await app.resolve(ExamsRepository);
  const subjects = await app.resolve(SubjectsRepository);
  const courses = await app.resolve(CoursesRepository);
  const rooms = await app.resolve(RoomsRepository);
  const common: CommonParams = {
    exams,
    subjects,
    courses,
    rooms: await rooms.find({}),
    lectures: await subjects.find({
      where: {
        type: SubjectType.LECTURE,
      },
      loadEagerRelations: false,
      relations: {
        news: false,
        forum: false,
        courses: false,
      },
    }),
  };
  await Promise.all(
    common.lectures.map((s) => createExamForSubject(common, s)),
  );
}
