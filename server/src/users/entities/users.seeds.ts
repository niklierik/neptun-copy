import { faker } from "@faker-js/faker/locale/hu";
import { hashPwd } from "src/utils/password";
import { QueryRunner } from "typeorm";
import { promises as fs } from "fs";
import { EOL } from "os";

const numberOfSeededUsers = 50;

export const seededUsers: string[] = [];

async function createUser(
  queryRunner: QueryRunner,
  email: string,
  birthdate: Date,
  password: string,
  familyname: string,
  forename: string,
  address: string,
  major: string,
): Promise<void> {
  await queryRunner.query(
    `INSERT INTO "SYSTEM"."users" ("email", "birthdate", "password", "familyname", "forename", "address", "majorMajorID", "validationToken", "isValid", "isAdmin") VALUES (:1, :2, :3, :4, :5, :6, :7, NULL, 1, 0)`,
    [email, birthdate, password, familyname, forename, address, major],
  );
}

async function createRandomUser(queryRunner: QueryRunner): Promise<void> {
  faker.locale = "hu";
  const gender = faker.name.sexType();
  const forename = faker.name.firstName(gender);
  const familyname = faker.name.lastName(gender);
  const email = faker.internet.email(forename, familyname).toLowerCase();
  const address = `${faker.address.zipCode(
    "####",
  )} ${faker.address.cityName()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;
  const teacher = Math.random() > 0.8; // próbáljuk inkább fiatalabakkal feltölteni az adatbázist, de legyenek idősebbek is
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
  await createUser(
    queryRunner,
    email,
    birthdate,
    hash,
    familyname,
    forename,
    address,
    major,
  );
  seededUsers.push(`${email} - ${password}`);
}

export async function seedUsers(queryRunner: QueryRunner): Promise<void> {
  await createUser(
    queryRunner,
    "sysadmin",
    new Date(),
    await hashPwd("admin"),
    "System",
    "Admin",
    "SystemAdmin",
    "none",
  );
  const promises: Promise<void>[] = [];
  for (let i = 0; i < numberOfSeededUsers; i++) {
    promises.push(createRandomUser(queryRunner));
  }
  await Promise.all(promises);
  await fs.writeFile("./seeded-users.txt", seededUsers.join(EOL), {
    encoding: "utf-8",
  });
}
