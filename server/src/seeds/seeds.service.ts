import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { seedMajors } from "src/majors/entities/majors.seeds";
import { seedUsers } from "src/users/entities/users.seeds";
import { DataSource, Repository } from "typeorm";
import { Seeded } from "./seeded.entity";
import { Seeding } from "./seeding";

let seedings: Seeding[] = [
  {
    id: 1,
    functionToRun: seedMajors,
  },
  {
    id: 2,
    functionToRun: seedUsers,
  },
];

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Seeded) private readonly repo: Repository<Seeded>,
    private ds: DataSource,
  ) {}

  async seed() {
    seedings = seedings.sort((a, b) => a.id - b.id);
    Logger.log("Starting seeding...");
    const qr = this.ds.createQueryRunner();
    for (const { id, functionToRun } of seedings) {
      try {
        let res = await this.repo.findOne({ where: { id } });
        if (res != null && res.run) {
          continue;
        }
        await qr.startTransaction();
        await functionToRun(qr);
        await qr.commitTransaction();
        res = this.repo.create({ id, run: true });
        await this.repo.save(res);
      } catch (err) {
        Logger.error(`Seeding ${id} failed, discontinuing the others...`);
        Logger.error(err);
        await qr
          .rollbackTransaction()
          .catch((err) => Logger.error(`Failed to rollback: ${err}.`));
        return;
      }
    }
    await qr.release();
    Logger.log("Seeding finished.");
  }
}
