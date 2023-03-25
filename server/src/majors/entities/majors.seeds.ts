import { INestApplication } from "@nestjs/common/interfaces";
import { MajorsRepository } from "../majors.repository";

async function createMajor(
  repo: MajorsRepository,
  majorID: string,
  displayName: string,
): Promise<void> {
  const major = repo.create({
    majorID,
    displayName,
  });
  await repo.save(major);
}

export async function seedMajors(app: INestApplication): Promise<void> {
  const repo = await app.resolve(MajorsRepository);
  await createMajor(repo, "none", "Nincs");
  await createMajor(repo, "admin", "Admin");
  await createMajor(repo, "proginf", "Programtervező Informatikus");
  await createMajor(repo, "minf", "Mérnök Informatikus");
  await createMajor(repo, "gazdinf", "Gazdaságinformatikus");
}
