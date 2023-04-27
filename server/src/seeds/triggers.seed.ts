import { INestApplication } from "@nestjs/common";
import { cfg } from "src/config/config";
import { UsersRepository } from "src/users/users.repository";

export async function roomSizeValidation(
  repo: UsersRepository,
  schema: string,
) {
  return repo.query(`
  CREATE OR REPLACE TRIGGER RoomSizeValidationTrigger
  BEFORE INSERT OR UPDATE
  ON "${schema}"."rooms"
  FOR EACH ROW
  BEGIN
      IF :NEW."size" <= 0 THEN
          RAISE_APPLICATION_ERROR(-20001, 'Room size validation failed. Must be positive integer.');
      END IF;
  END;
  `);
}

export async function userValidation(repo: UsersRepository, schema: string) {
  return repo.query(`
    CREATE OR REPLACE TRIGGER UserValidationTrigger
    BEFORE INSERT OR UPDATE
    ON "${schema}"."users"
    FOR EACH ROW
    BEGIN
        IF  (LENGTH(:NEW."email") = 0) OR
            (LENGTH(:NEW."address") = 0) OR
            (LENGTH(:NEW."forename") = 0) OR
            (LENGTH(:NEW."familyname") = 0) OR
            (LENGTH(:NEW."isAdmin") NOT IN (0, 1)) THEN
            -- MajorID is checked by DB with foreign key check
                RAISE_APPLICATION_ERROR(-20001, 'User validation failed.');
        END IF;
    END;
    `);
}

export async function marksValidation(repo: UsersRepository, schema: string) {
  return repo.query(`
    CREATE OR REPLACE TRIGGER MarkValidationTrigger
    BEFORE INSERT OR UPDATE
    ON "${schema}"."marks"
    FOR EACH ROW
    BEGIN
        IF  (:NEW."mark" > 5) OR (:NEW."mark" < 1) THEN
                RAISE_APPLICATION_ERROR(-20001, 'Mark must be between 1 and 5.');
        END IF;
    END;
`);
}

export async function seedTriggers(app: INestApplication) {
  const repo = await app.resolve(UsersRepository);
  const config = cfg();
  const schema = config.db.schema;
  await roomSizeValidation(repo, schema);
  await userValidation(repo, schema);
  await marksValidation(repo, schema);
}
