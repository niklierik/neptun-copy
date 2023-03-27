import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { LoremIpsum } from "lorem-ipsum";
import { CoursesRepository } from "src/courses/courses.repository";
import { Course } from "src/courses/entities/course.entity";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { User } from "src/users/entities/users.entity";
import { UsersRepository } from "src/users/users.repository";
import { Not } from "typeorm";
import { CommonForumRepository } from "../common-forum.repository";
import { ForumRepository } from "../forum.repository";
import { Subject } from "src/subjects/entities/subject.entity";

const numberOfMessages = 50;

function random<T>(array: T[]): T {
  if (array.length == 0) {
    return undefined;
  }
  if (array.length == 1) {
    return array[0];
  }
  return array[faker.datatype.number({ min: 0, max: array.length - 1 })];
}

async function genForum(
  users: User[],
  forum: ForumRepository,
  courses: Course[],
) {
  const sender = random(users);
  const course = random(courses);
  return forum.save(
    forum.create({
      sender,
      message: new LoremIpsum().generateWords(
        faker.datatype.number({ min: 3, max: 10 }),
      ),
      course,
    }),
  );
}

async function genCommonForum(
  users: User[],
  commonForum: CommonForumRepository,
  subjects: Subject[],
) {
  const sender = random(users);
  const subject = random(subjects);
  return commonForum.save(
    commonForum.create({
      sender,
      message: new LoremIpsum().generateWords(
        faker.datatype.number({ min: 3, max: 10 }),
      ),
      subject,
    }),
  );
}

async function runManyTimes<T>(action: () => Promise<T>): Promise<T[]> {
  const promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(action);
  }
  return Promise.all(promises);
}

export async function seedForum(app: INestApplication) {
  const forum = await app.resolve(ForumRepository);
  const commonForum = await app.resolve(CommonForumRepository);
  const usersR = await app.resolve(UsersRepository);
  const users = await usersR.find({ where: { email: Not("sysadmin") } });
  const coursesR = await app.resolve(CoursesRepository);
  const courses = await coursesR.find({});
  const subjectsR = await app.resolve(SubjectsRepository);
  const subjects = await subjectsR.find({});
  let promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(genForum(users, forum, courses));
  }
  await Promise.all(promises);
  promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(genCommonForum(users, commonForum, subjects));
  }
  await Promise.all(promises);
}
