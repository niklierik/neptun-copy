import { Injectable, Logger } from "@nestjs/common";
import { INestApplication } from "@nestjs/common/interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { seedMajors } from "src/majors/entities/majors.seeds";
import { seedCourses } from "src/courses/courses.seed";
import { seedUsers } from "src/users/entities/users.seeds";
import { Repository } from "typeorm";
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
  {
    id: 3,
    functionToRun: seedCourses,
  },
  {
    id: 4,
    functionToRun: seedCourses,
  },
];

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Seeded) private readonly repo: Repository<Seeded>,
  ) {}

  async seed(app: INestApplication) {
    seedings = seedings.sort((a, b) => a.id - b.id);
    Logger.log("Starting seeding...");
    let counter = 0;
    for (const { id, functionToRun } of seedings) {
      try {
        let res = await this.repo.findOne({ where: { id } });
        if (res != null && res.run) {
          continue;
        }
        await functionToRun(app);
        res = this.repo.create({ id, run: true });
        await this.repo.save(res);
        counter++;
      } catch (err) {
        Logger.error(`Seeding ${id} failed, discontinuing the others...`);
        Logger.error(err);
        return;
      }
    }
    Logger.log(`Tables seeded: ${counter}.`);
  }
}
