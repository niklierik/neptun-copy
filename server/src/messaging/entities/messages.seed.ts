import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import * as _ from "lodash";
import { LoremIpsum } from "lorem-ipsum";
import { User } from "src/users/entities/users.entity";
import { UsersRepository } from "src/users/users.repository";
import { Not } from "typeorm";
import { MessagingRepository } from "../messaging.repository";

const numberOfMessages = 50;

function selectTwo<T>(array: T[]): [u1: T, u2: T] {
  if (array.length < 2) {
    throw new Error("InvalidArgument");
  }
  if (array.length == 2) {
    return [array[0], array[1]];
  }
  let copy = [...array];
  copy = _.shuffle(copy);
  return [copy[0], copy[1]];
}

async function genMessage(users: User[], messages: MessagingRepository) {
  const [from, to] = selectTwo(users);
  const createdAt = faker.date.recent(120);
  return messages.save(
    messages.create({
      from,
      to,
      createdAt,
      message: new LoremIpsum().generateWords(
        faker.datatype.number({ min: 3, max: 10 }),
      ),
    }),
  );
}

export async function seedMessages(app: INestApplication) {
  const messages = await app.resolve(MessagingRepository);
  const usersR = await app.resolve(UsersRepository);
  const users = await usersR.find({ where: { email: Not("sysadmin") } });
  const promises = [];
  for (let i = 0; i < numberOfMessages; i++) {
    promises.push(genMessage(users, messages));
  }
  await Promise.all(promises);
}
