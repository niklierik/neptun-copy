import { faker } from "@faker-js/faker/locale/hu";
import { hashPwd } from "src/utils/password";
import { promises as fs } from "fs";
import { EOL } from "os";
import { INestApplication } from "@nestjs/common";
import { UsersRepository } from "../users.repository";

const numberOfSeededUsers = 50;

export const seededUsers: string[] = [];

async function createUser(
  repo: UsersRepository,
  email: string,
  birthdate: Date,
  password: string,
  familyname: string,
  forename: string,
  address: string,
  majorID: string,
  isAdmin: boolean,
): Promise<void> {
  const user = repo.create({
    address,
    birthdate,
    email,
    familyname,
    forename,
    major: {
      majorID,
    },
    password,
    isValid: true,
    isAdmin,
  });
  await repo.save(user);
}

export async function createFakeUserInfo(teacher?: boolean) {
  faker.locale = "hu";
  const gender = faker.name.sexType();
  const forename = faker.name.firstName(gender);
  const familyname = faker.name.lastName(gender);
  const email = faker.internet.email(forename, familyname).toLowerCase();
  const address = `${faker.address.zipCode(
    "####",
  )} ${faker.address.cityName()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;
  teacher ??= Math.random() > 0.8; // próbáljuk inkább fiatalabakkal feltölteni az adatbázist, de legyenek idősebbek is
  const password = `${faker.random
    .words(2)
    .replace(" ", "")}${faker.datatype.number({ min: 0, max: 999 })}`;
  const hash = await hashPwd(password);
  const birthdate = faker.date.birthdate({
    min: teacher ? 25 : 18,
    max: teacher ? 60 : 30,
    mode: "age",
  });
  const majorIndex = faker.datatype.number({ min: 0, max: 2 });
  const major = ["proginf", "minf", "gazdinf"][majorIndex];
  return {
    address,
    birthdate,
    email,
    familyname,
    forename,
    hash,
    major,
    password,
  };
}

async function createRandomUser(repo: UsersRepository): Promise<void> {
  const {
    email,
    birthdate,
    hash,
    familyname,
    forename,
    address,
    major,
    password,
  } = await createFakeUserInfo(false); // tanárokat a kurzusokkal seedeljük
  await createUser(
    repo,
    email,
    birthdate,
    hash,
    familyname,
    forename,
    address,
    major,
    false,
  );
  seededUsers.push(`Hallgató: ${email} - ${password}`);
}

export async function seedUsers(app: INestApplication): Promise<void> {
  const repo = await app.resolve(UsersRepository);
  await createUser(
    repo,
    "sysadmin",
    new Date(),
    await hashPwd("admin"),
    "System",
    "Admin",
    "SystemAdmin",
    "admin",
    true,
  );
  const promises: Promise<void>[] = [];
  for (let i = 0; i < numberOfSeededUsers; i++) {
    promises.push(createRandomUser(repo));
  }
  await Promise.all(promises);
  await fs.writeFile("./seeded-users.txt", seededUsers.join(EOL), {
    encoding: "utf-8",
  });
}
