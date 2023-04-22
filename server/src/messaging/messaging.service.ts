import {
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { MessagingRepository } from "./messaging.repository";

@Injectable()
export class MessagingService {
  constructor(private readonly messagingRepo: MessagingRepository) {}

  async write(user: User, to: string, message: string) {
    if (!(message && to)) {
      throw new PreconditionFailedException(
        "Nincs címzett vagy üzenet megadva!",
      );
    }
    return this.messagingRepo.save(
      this.messagingRepo.create({
        from: user,
        to: {
          email: to,
        },
        message,
      }),
    );
  }

  async list(user: User, u1?: string, u2?: string) {
    u1 ??= user.email;
    u2 ??= user.email;
    if (!(user.isAdmin || u1 === user.email || u2 === user.email)) {
      throw new ForbiddenException();
    }
    return this.messagingRepo.find({
      where: [
        {
          from: {
            email: u1,
          },
          to: { email: u2 },
        },
        {
          from: { email: u2 },
          to: { email: u1 },
        },
      ],
      relations: {
        from: true,
        to: true,
      },
      order: {
        createdAt: "ASC",
      },
      loadEagerRelations: false,
    });
  }
}
