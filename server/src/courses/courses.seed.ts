import { INestApplication } from "@nestjs/common";
import { Room } from "src/rooms/room.entity";
import { RoomsRepository } from "src/rooms/rooms.repository";
import { User } from "src/users/entities/users.entity";
import { SubjectType } from "../subjects/subject-type.enum";
import { SubjectsRepository } from "../subjects/subjects.repository";
import { CoursesRepository } from "./courses.repository";
import {
  TimeTableOfWeek,
  createTimetables,
  getAvailableSlots,
  Slot,
} from "./timetable";
import { faker } from "@faker-js/faker/locale/hu";
import { UsersRepository } from "src/users/users.repository";
import { createFakeUserInfo } from "src/users/entities/users.seeds";
import { Subject } from "src/subjects/subject.entity";
import { Semester } from "./course.entity";

const seededUsers = [];

async function createWithType(
  subjects: SubjectsRepository,
  name: string,
  hoursAWeek: number,
  type: SubjectType,
) {
  if (hoursAWeek <= 0) {
    return;
  }
  return await subjects.save(
    subjects.create({
      name,
      hoursAWeek,
      type,
    }),
  );
}

async function createTeacher(common: CommonParams): Promise<User> {
  faker.locale = "hu";
  const gen = await createFakeUserInfo(true);
  seededUsers.push(`Oktató: ${gen.email} - ${gen.password}`);
  const user = common.users.create({
    address: gen.address,
    birthdate: gen.birthdate,
    email: gen.email,
    password: gen.hash,
    familyname: gen.familyname,
    forename: gen.forename,
    validationToken: null,
    isAdmin: false,
    isValid: true,
    major: {
      majorID: gen.major,
    },
  });
  return common.users.save(user);
}

async function createPracticesFor(
  common: CommonParams,
  numberOfPractices: number,
  subject: Subject,
  rooms: Room[],
) {
  const teachers: User[] = [];
  const numberOfTeachers = Math.random() * numberOfPractices;
  for (let i = 0; i < numberOfTeachers; i++) {
    teachers.push(await createTeacher(common));
  }
  for (let i = 0; i < numberOfPractices; i++) {
    const teacher =
      teachers[faker.datatype.number({ min: 0, max: teachers.length - 1 })];
    const slots = getAvailableSlots(common.timetable, rooms);
    const slot =
      slots[faker.datatype.number({ min: 0, max: slots.length - 1 })];
    slot.available = false;
    slot.subject = subject;
    slot.teacher = teacher;
    slot.course = await createPracticeFor(common, subject, teacher, slot);
  }
}

async function createPracticeFor(
  common: CommonParams,
  subject: Subject,
  teacher: User,
  slot: Slot,
) {
  return common.courses.save(
    common.courses.create({
      room: slot.room,
      teachers: [teacher],
      semester: Semester.SPRING,
      subject,
      year: 2023,
      start: new Date(0, 0, 0, slot.hour, 0, 0, 0),
      dayOfWeek: slot.day,
    }),
  );
}

async function createLectureFor(
  common: CommonParams,
  room: Room,
  subject: Subject,
  teacher: User,
  slot: Slot,
) {
  return common.courses.save(
    common.courses.create({
      room,
      subject,
      teachers: [teacher],
      dayOfWeek: slot.day,
      year: 2023,
      start: new Date(0, 0, 0, slot.hour),
      semester: Semester.SPRING,
    }),
  );
}

async function createSubject(
  common: CommonParams,
  name: string,
  hoursAWeekPractice: number,
  numberOfPractices: number,
  useRooms: Room[],
  hoursAWeekLecture?: number,
  lectureRoom?: Room,
) {
  const teacher = await createTeacher(common);
  const [practice, lecture] = await Promise.all([
    createWithType(
      common.subjects,
      name,
      hoursAWeekPractice,
      SubjectType.LECTURE,
    ),
    createWithType(
      common.subjects,
      name,
      hoursAWeekLecture ?? hoursAWeekPractice,
      SubjectType.PRACTICE,
    ),
  ]);
  if (hoursAWeekLecture >= 0 && lectureRoom) {
    const slots = getAvailableSlots(common.timetable, [lectureRoom]);
    const slot =
      slots[faker.datatype.number({ min: 0, max: slots.length - 1 })];
    slot.available = false;
    slot.teacher = teacher;
    slot.subject = lecture;
    slot.course = await createLectureFor(
      common,
      lectureRoom,
      lecture,
      teacher,
      slot,
    );
  }
  await createPracticesFor(common, numberOfPractices, practice, useRooms);
}

async function createRoom(
  name: string,
  size: number,
  repo: RoomsRepository,
): Promise<Room> {
  const room = repo.create({
    name,
    size,
  });
  return repo.save(room);
}

function irinyi(n: number) {
  if (!(217 <= n && n <= 225)) {
    throw new Error("n must be between 217 and 225");
  }
  return `Irinyi-${n}`;
}

function tik() {
  return "TIK Előadó";
}

export async function seedRooms(app: INestApplication): Promise<{
  conference: Room;
  irinyi217: Room;
  irinyiRooms: Room[];
}> {
  const repo = await app.resolve(RoomsRepository);
  const numbers = [];
  const conference = await createRoom(tik(), 500, repo);
  /**
   * Hunglish da best
   */
  const irinyi217 = await createRoom(irinyi(217), 60, repo);
  for (let i = 218; i <= 225; i++) {
    numbers.push(i);
  }
  /**
   * Hunglish da best
   */
  const irinyiRooms = await Promise.all(
    numbers.map((i) => createRoom(irinyi(i), 30, repo)),
  );
  return {
    conference,
    irinyi217,
    irinyiRooms,
  };
}

interface CommonParams {
  subjects: SubjectsRepository;
  courses: CoursesRepository;
  users: UsersRepository;
  timetable: TimeTableOfWeek;
}

/**
 * Seeds also subjects and rooms
 */
export async function seedCourses(app: INestApplication) {
  const { conference, irinyi217, irinyiRooms } = await seedRooms(app);
  const rooms = [...irinyiRooms, conference, irinyi217];
  const common: CommonParams = {
    subjects: await app.resolve(SubjectsRepository),
    courses: await app.resolve(CoursesRepository),
    users: await app.resolve(UsersRepository),
    timetable: createTimetables(rooms),
  };
  await createSubject(
    common,
    "Programozás I.",
    2,
    3,
    [irinyi217],
    2,
    conference,
  );
  await createSubject(
    common,
    "Adatbázis alapú rendszerek",
    2,
    3,
    irinyiRooms,
    2,
    conference,
  );
  await createSubject(
    common,
    "Algoritmusok és Adatszerkezetek II.",
    1,
    3,
    irinyiRooms,
    2,
    conference,
  );
  await createSubject(common, "Webtervezés", 1, 3, [irinyi217], 2, conference);
  await createSubject(
    common,
    "Webfejlesztési keretrendszerek",
    2,
    1,
    [irinyi217],
    2,
    conference,
  );
  await createSubject(
    common,
    "Python programozás a gyakorlatban",
    2,
    1,
    [irinyi217],
    0,
  );
  await createSubject(
    common,
    "Digitális képfeldolgozás",
    1,
    6,
    irinyiRooms,
    2,
    conference,
  );
  await createSubject(
    common,
    "Formális nyelvek",
    1,
    6,
    irinyiRooms,
    2,
    conference,
  );
  await createSubject(
    common,
    "Mobilalkalmazás fejlesztés",
    1,
    2,
    [irinyi217],
    2,
    conference,
  );
}
