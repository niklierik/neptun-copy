import { INestApplication } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";

export async function seedNumberOfTeachers(repo: UsersRepository) {
  return repo.query(`
-- Number of teachers
CREATE OR REPLACE FUNCTION NumberOfTeachers
RETURN NUMBER
IS
    teachers NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO teachers FROM "courses_teachers_users";
    RETURN teachers;
END;
  `);
}

export function seedNumberOfStudents(repo: UsersRepository) {
  return repo.query(`
CREATE OR REPLACE FUNCTION NumberOfStudents
RETURN NUMBER
IS
    students NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO students FROM "courses_students_users";
    RETURN students;
END;
  `);
}

export function seedNumberOfBoth(repo: UsersRepository) {
  return repo.query(`
CREATE OR REPLACE FUNCTION NumberOfIntersection
RETURN NUMBER
IS
    users NUMBER;
BEGIN
    SELECT COUNT(DISTINCT teacher."usersEmail") count  INTO users FROM "courses_teachers_users" teacher
    INNER JOIN (
        SELECT DISTINCT "usersEmail" FROM "courses_students_users"
    ) student ON teacher."usersEmail" = student."usersEmail";
    RETURN users;
END;
  `);
}

export async function seedMarkAvgFunction(repo: UsersRepository) {
  await repo.query(`
CREATE OR REPLACE FUNCTION AverageMarkOfUser
(
    user "SYSTEM"."users"."email"%TYPE
)
RETURN FLOAT
IS
    a FLOAT;
BEGIN
    SELECT SUM((m."mark" * s."credit")) / SUM(s."credit") average INTO a FROM "SYSTEM"."marks" m INNER JOIN "SYSTEM"."subjects" s ON m."subjectId" = s."id" WHERE m."userEmail" = user;
    return a;
END;
  `);
}

export async function seedDbFunctions(app: INestApplication) {
  const repo = await app.resolve(UsersRepository);
  await seedNumberOfTeachers(repo);
  await seedNumberOfStudents(repo);
  await seedNumberOfBoth(repo);
  await seedMarkAvgFunction(repo);
}
