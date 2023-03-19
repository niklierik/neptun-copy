import { QueryRunner } from "typeorm";

async function createMajor(
  queryRunner: QueryRunner,
  id: string,
  name: string,
): Promise<void> {
  await queryRunner.query(
    `INSERT INTO "SYSTEM"."majors" ("SYSTEM"."majors"."majorID", "SYSTEM"."majors"."displayName") VALUES (:1, :2)`,
    [id, name],
  );
}

export async function seedMajors(queryRunner: QueryRunner): Promise<void> {
  await createMajor(queryRunner, "none", "Nincs");
  await createMajor(queryRunner, "proginf", "Programtervező Informatikus");
  await createMajor(queryRunner, "minf", "Mérnök Informatikus");
  await createMajor(queryRunner, "gazdinf", "Gazdaságinformatikus");
}
