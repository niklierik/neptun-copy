import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { LoremIpsum } from "lorem-ipsum";
import { CoursesRepository } from "src/courses/courses.repository";
import { Course } from "src/courses/entities/course.entity";
import { SubjectsRepository } from "src/subjects/subjects.repository";
import { Subject } from "src/subjects/entities/subject.entity";
import { NewsRepository } from "../news.repository";
import { CommonNewsRepository } from "../common-news.repository";

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

async function genNews(news: NewsRepository, courses: Course[]) {
  const course = random(courses);
  return news.save(
    news.create({
      content: new LoremIpsum().generateWords(
        faker.datatype.number({ min: 3, max: 10 }),
      ),
      course,
    }),
  );
}

async function genCommonNews(
  commonNews: CommonNewsRepository,
  subjects: Subject[],
) {
  const subject = random(subjects);
  return commonNews.save(
    commonNews.create({
      content: new LoremIpsum().generateWords(
        faker.datatype.number({ min: 3, max: 10 }),
      ),
      subject,
    }),
  );
}

export async function seedNews(app: INestApplication) {
  const news = await app.resolve(NewsRepository);
  const commonNews = await app.resolve(CommonNewsRepository);
  const coursesR = await app.resolve(CoursesRepository);
  const courses = await coursesR.find({});
  const subjectsR = await app.resolve(SubjectsRepository);
  const subjects = await subjectsR.find({});
  let promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(genNews(news, courses));
  }
  await Promise.all(promises);
  promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(genCommonNews(commonNews, subjects));
  }
  await Promise.all(promises);
}
