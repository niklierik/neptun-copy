import { INestApplication } from "@nestjs/common";
import { Room } from "src/rooms/room.entity";
import { RoomsRepository } from "src/rooms/rooms.repository";
import { User } from "src/users/entities/users.entity";
import { SubjectType } from "../../subjects/entities/subject-type.enum";
import { SubjectsRepository } from "../../subjects/subjects.repository";
import { CoursesRepository } from "../courses.repository";
import {
  TimeTableOfWeek,
  createTimetables,
  getAvailableSlots,
  Slot,
  getAllSlotsAt,
} from "./timetable";
import { faker } from "@faker-js/faker/locale/hu";
import { UsersRepository } from "src/users/users.repository";
import { createFakeUserInfo } from "src/users/entities/users.seeds";
import { Subject } from "src/subjects/entities/subject.entity";
import { Semester } from "./course.entity";
import { appendFile } from "fs/promises";
import { EOL } from "os";
import { EducationChartsRepository } from "src/education-charts/education-chart.repository";
import { Major } from "src/majors/entities/majors.entity";
import { MajorsRepository } from "src/majors/majors.repository";
import { RequirementType } from "src/education-charts/education-chart.entity";
import * as _ from "lodash";
import { In, Not } from "typeorm";

const seededUsers = [];

interface CommonParams {
  subjects: SubjectsRepository;
  courses: CoursesRepository;
  users: UsersRepository;
  timetable: TimeTableOfWeek;
  conference: Room;
  irinyi217: Room;
  irinyiRooms: Room[];
  year: number;
  semester: Semester;
  educharts: EducationChartsRepository;
  proginf: Major;
  minf: Major;
  gazdinf: Major;
  students?: User[];
  teachers: string[];
}

async function createWithType(
  subjects: SubjectsRepository,
  name: string,
  hoursAWeek: number,
  type: SubjectType,
  credit: number,
) {
  if (hoursAWeek <= 0) {
    return;
  }
  return subjects.save(
    subjects.create({
      name,
      hoursAWeek,
      type,
      credit,
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
  common.teachers.push(user.email);
  return common.users.save(user);
}

async function getStudents(common: CommonParams) {
  if (common.students == null) {
    common.students = await common.users.find({
      where: {
        email: Not(In(common.teachers)),
      },
    });
  }
  return common.students;
}

async function createPracticesFor(
  common: CommonParams,
  numberOfPractices: number,
  subject: Subject,
  rooms: Room[],
  users: User[],
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
    if (slots.length == 0) {
      throw new Error("Unable to seed courses, not enough space.");
    }
    const slot =
      slots[faker.datatype.number({ min: 0, max: slots.length - 1 })];
    const [next] = getAllSlotsAt(common.timetable, slot.day, slot.hour + 1, [
      slot.room,
    ]);
    if (next == null) {
      throw new Error("Should not happen.");
    }
    const count = Math.random() * 2 + 1;
    users = _.shuffle(users);
    const students: User[] = [];
    for (let i = 0; i < count && i < users.length; i++) {
      students.push(users.pop());
    }
    slot.available = false;
    slot.subject = subject;
    slot.teacher = teacher;
    slot.course = await createPracticeFor(
      common,
      subject,
      teacher,
      slot,
      students,
    );
    next.available = slot.available = false;
    next.teacher = slot.teacher = teacher;
    next.subject = slot.subject = subject;
    if (subject.hoursAWeek == 2) {
      next.course = slot.course;
    } else {
      next.course = await createPracticeFor(common, subject, teacher, next, []);
    }
  }
}

async function createPracticeFor(
  common: CommonParams,
  subject: Subject,
  teacher: User,
  slot: Slot,
  students: User[],
) {
  return common.courses.save(
    common.courses.create({
      room: slot.room,
      teachers: [teacher],
      semester: common.semester,
      subject,
      year: common.year,
      startAt: slot.hour,
      dayOfWeek: slot.day,
      students,
    }),
  );
}

async function createLectureFor(
  common: CommonParams,
  room: Room,
  subject: Subject,
  teacher: User,
  slot: Slot,
  students: User[],
) {
  return common.courses.save(
    common.courses.create({
      room,
      subject,
      teachers: [teacher],
      dayOfWeek: slot.day,
      year: common.year,
      startAt: slot.hour,
      semester: common.semester,
      students,
    }),
  );
}

async function createSubject(
  common: CommonParams,
  name: string,
  hoursAWeekPractice: number,
  numberOfPractices: number,
  creditForPractice: number,
  useRooms: Room[],
  hoursAWeekLecture?: number,
  lectureRoom?: Room,
  creditForLecture?: number,
) {
  const teacher = await createTeacher(common);
  const students: User[] = [];
  let users: User[] = await getStudents(common);
  users = _.shuffle(users);
  const count = Math.random() * 13 + 2;
  for (let i = 0; i < count; i++) {
    students.push(users[i]);
  }
  const [practice, lecture] = [
    await createWithType(
      common.subjects,
      name,
      hoursAWeekPractice,
      SubjectType.PRACTICE,
      creditForPractice,
    ),
    await createWithType(
      common.subjects,
      name,
      hoursAWeekLecture ?? hoursAWeekPractice,
      SubjectType.LECTURE,
      creditForLecture ?? creditForPractice,
    ),
  ];
  if (hoursAWeekLecture >= 0 && lectureRoom) {
    const slots = getAvailableSlots(common.timetable, [lectureRoom]);
    if (slots.length == 0) {
      throw new Error("Unable to seed courses, not enough space.");
    }
    const slot =
      slots[faker.datatype.number({ min: 0, max: slots.length - 1 })];
    const [next] = getAllSlotsAt(common.timetable, slot.day, slot.hour + 1, [
      slot.room,
    ]);
    if (next == null) {
      throw new Error("Should not happen.");
    }
    next.available = slot.available = false;
    next.teacher = slot.teacher = teacher;
    next.subject = slot.subject = lecture;
    slot.course = await createLectureFor(
      common,
      lectureRoom,
      lecture,
      teacher,
      slot,
      students,
    );
  }
  await createPracticesFor(
    common,
    numberOfPractices,
    practice,
    useRooms,
    students,
  );
  return { lecture, practice };
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

interface EduChartInfo {
  requirement: RequirementType;
  recommendedSemester: number;
}

async function assignPairToEduChart(
  common: CommonParams,
  subject: { lecture: Subject; practice: Subject },
  forProginf: EduChartInfo,
  forGazdinf: EduChartInfo,
  forMinf: EduChartInfo,
) {
  return await Promise.all([
    assignToEduChart(common, subject.lecture, forProginf, forGazdinf, forMinf),
    assignToEduChart(common, subject.practice, forProginf, forGazdinf, forMinf),
  ]);
}

async function assignToEduChart(
  common: CommonParams,
  subject: Subject,
  forProginf: EduChartInfo,
  forGazdinf: EduChartInfo,
  forMinf: EduChartInfo,
) {
  if (subject == null) {
    return;
  }
  return await Promise.all([
    common.educharts.save(
      common.educharts.create({
        subject: subject,
        major: {
          majorID: "proginf",
        },
        recommendedSemester: forProginf.recommendedSemester,
        requirementType: forProginf.requirement,
      }),
    ),
    common.educharts.save(
      common.educharts.create({
        subject: subject,
        major: {
          majorID: "gazdinf",
        },
        recommendedSemester: forGazdinf.recommendedSemester,
        requirementType: forGazdinf.requirement,
      }),
    ),
    common.educharts.save(
      common.educharts.create({
        subject: subject,
        major: {
          majorID: "minf",
        },
        recommendedSemester: forMinf.recommendedSemester,
        requirementType: forMinf.requirement,
      }),
    ),
  ]);
}

async function seedSpringCourses(common: CommonParams) {
  const { irinyi217, conference, irinyiRooms } = common;
  const rooms = [...irinyiRooms, conference, irinyi217];
  common.timetable = createTimetables(rooms);
  common.year = 2023;
  common.semester = Semester.SPRING;
  const [
    prog1,
    adatbalap,
    alga2,
    webt,
    webkert,
    python,
    digikep,
    fonya,
    mobilalk,
    jatekfejl,
  ] = await Promise.all([
    createSubject(
      common,
      "Programozás I.",
      2,
      3,
      4,
      [irinyi217],
      2,
      conference,
    ),
    createSubject(
      common,
      "Adatbázis alapú rendszerek",
      2,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Algoritmusok és Adatszerkezetek II.",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(common, "Webtervezés", 1, 3, 2, [irinyi217], 2, conference),
    createSubject(
      common,
      "Webfejlesztési keretrendszerek",
      2,
      1,
      2,
      [irinyi217],
      2,
      conference,
    ),
    createSubject(
      common,
      "Python programozás a gyakorlatban",
      2,
      1,
      3,
      [irinyi217],
      0,
    ),
    createSubject(
      common,
      "Digitális képfeldolgozás",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Formális nyelvek",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Mobilalkalmazás fejlesztés",
      1,
      2,
      2,
      [irinyi217],
      2,
      conference,
    ),
    createSubject(common, "Játékfejlesztés", 1, 1, 3, irinyiRooms),
  ]);
  return Promise.all([
    assignPairToEduChart(
      common,
      mobilalk,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      webkert,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      prog1,
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
    ),

    assignPairToEduChart(
      common,
      webt,
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 2,
        requirement: RequirementType.REQIRED,
      },
    ),
    assignPairToEduChart(
      common,
      adatbalap,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      adatbalap,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      jatekfejl,
      {
        recommendedSemester: 4,
        requirement: RequirementType.CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      python,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      alga2,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      fonya,
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 4,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      digikep,
      {
        recommendedSemester: 6,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 6,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 6,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
  ]);
}

async function seedFallCourses(common: CommonParams) {
  const { irinyi217, conference, irinyiRooms } = common;
  const rooms = [...irinyiRooms, conference, irinyi217];
  common.timetable = createTimetables(rooms);
  common.year = 2022;
  common.semester = Semester.FALL;
  const [
    koszi,
    alkstat,
    szkript,
    alkfejl2,
    progalap,
    prog2,
    adatb,
    mestint,
    bonya,
  ] = await Promise.all([
    createSubject(
      common,
      "Közelítő és Szimbólikus Számítások",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Alkalmazott Statisztika",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Szkriptnyelvek",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Alkalmazás Fejlesztés II.",
      2,
      3,
      2,
      [irinyi217],
      2,
      conference,
    ),
    createSubject(
      common,
      "Programozás Alapjai",
      2,
      4,
      4,
      [irinyi217],
      2,
      conference,
    ),
    createSubject(
      common,
      "Programozás II.",
      1,
      3,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(common, "Adatbázisok", 1, 3, 2, irinyiRooms, 2, conference),
    createSubject(
      common,
      "Mesterséges Intelligencia",
      1,
      2,
      2,
      irinyiRooms,
      2,
      conference,
    ),
    createSubject(
      common,
      "Bonyolultság-elmélet",
      1,
      2,
      2,
      irinyiRooms,
      2,
      conference,
    ),
  ]);
  return Promise.all([
    assignPairToEduChart(
      common,
      progalap,
      {
        recommendedSemester: 1,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 1,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 1,
        requirement: RequirementType.REQIRED,
      },
    ),
    assignPairToEduChart(
      common,
      prog2,
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
    ),
    assignPairToEduChart(
      common,
      koszi,
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      szkript,
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      alkstat,
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      alkfejl2,
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      adatb,
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 3,
        requirement: RequirementType.REQIRED,
      },
    ),
    assignPairToEduChart(
      common,
      mestint,
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
    assignPairToEduChart(
      common,
      bonya,
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQIRED,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
      {
        recommendedSemester: 5,
        requirement: RequirementType.REQUIRED_CHOSEN,
      },
    ),
  ]);
}

/**
 * Seeds also subjects and rooms
 */
export async function seedCourses(app: INestApplication) {
  const { conference, irinyi217, irinyiRooms } = await seedRooms(app);
  const majors = await app.resolve(MajorsRepository);
  const common: CommonParams = {
    subjects: await app.resolve(SubjectsRepository),
    courses: await app.resolve(CoursesRepository),
    users: await app.resolve(UsersRepository),
    educharts: await app.resolve(EducationChartsRepository),
    timetable: createTimetables([]),
    conference,
    irinyi217,
    irinyiRooms,
    semester: Semester.SPRING,
    year: 2023,
    proginf: await majors.findById("proginf", false),
    gazdinf: await majors.findById("gazdinf", false),
    minf: await majors.findById("minf", false),
    teachers: [],
  };
  await seedFallCourses(common);
  await seedSpringCourses(common);
  await appendFile(
    "../seeded-users.txt",
    EOL + EOL + "--------" + EOL + EOL + seededUsers.join(EOL),
    {
      encoding: "utf-8",
    },
  );
}
