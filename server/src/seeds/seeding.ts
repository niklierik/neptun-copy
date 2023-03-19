import { QueryRunner } from "typeorm";

export class Seeding {
  id: number;
  functionToRun: (qr: QueryRunner) => Promise<void>;
}
