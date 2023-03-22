import { INestApplication } from "@nestjs/common";
import { RoomsRepository } from "./rooms.repository";

async function createRoom(name: string, size: number, repo: RoomsRepository) {
  const room = repo.create({
    name,
    size,
  });
  await repo.save(room);
}

export async function seedRooms(app: INestApplication) {
  const repo = await app.resolve(RoomsRepository);
  const numbers = [];
  await createRoom(`Irinyi-217`, 60, repo);
  for (let i = 218; i <= 225; i++) {
    numbers.push(i);
  }
  await Promise.all(
    numbers.map(async (i) => {
      await createRoom(`Irinyi-${i}`, 30, repo);
    }),
  );
}
