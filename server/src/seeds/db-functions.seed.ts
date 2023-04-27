import { INestApplication } from "@nestjs/common";
import { cfg } from "src/config/config";
import { UsersRepository } from "src/users/users.repository";

export async function seedNumberOfTeachers(
  repo: UsersRepository,
  schema: string,
) {
  return repo.query(`
-- Number of teachers
CREATE OR REPLACE FUNCTION NumberOfTeachers
RETURN NUMBER
IS
    teachers NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO teachers FROM "${schema}"."courses_teachers_users";
    RETURN teachers;
END;
  `);
}

export function seedNumberOfStudents(repo: UsersRepository, schema: string) {
  return repo.query(`
CREATE OR REPLACE FUNCTION NumberOfStudents
RETURN NUMBER
IS
    students NUMBER;
BEGIN
    SELECT COUNT(DISTINCT "usersEmail") count INTO students FROM "${schema}"."courses_students_users";
    RETURN students;
END;
  `);
}

export function seedNumberOfBoth(repo: UsersRepository, schema: string) {
  return repo.query(`
CREATE OR REPLACE FUNCTION NumberOfIntersection
RETURN NUMBER
IS
    users NUMBER;
BEGIN
    SELECT COUNT(DISTINCT teacher."usersEmail") count  INTO users FROM "${schema}"."courses_teachers_users" teacher
    INNER JOIN (
        SELECT DISTINCT "usersEmail" FROM "courses_students_users"
    ) student ON teacher."usersEmail" = student."usersEmail";
    RETURN users;
END;
  `);
}

export async function seedMarkAvgFunction(
  repo: UsersRepository,
  schema: string,
) {
  await repo.query(`
CREATE OR REPLACE FUNCTION AverageMarkOfUser
(
    user "${schema}"."users"."email"%TYPE
)
RETURN FLOAT
IS
    a FLOAT;
BEGIN
    SELECT SUM((m."mark" * s."credit")) / SUM(s."credit") average INTO a FROM "${schema}"."marks" m INNER JOIN "${schema}"."subjects" s ON m."subjectId" = s."id" WHERE m."userEmail" = user;
    return a;
END;
  `);
}

export async function seedDbFunctions(app: INestApplication) {
  const repo = await app.resolve(UsersRepository);
  const config = cfg();
  const schema = config.db.schema;
  await seedNumberOfTeachers(repo, schema);
  await seedNumberOfStudents(repo, schema);
  await seedNumberOfBoth(repo, schema);
  await seedMarkAvgFunction(repo, schema);
}
