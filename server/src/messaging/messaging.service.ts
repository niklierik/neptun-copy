import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { MessagingRepository } from "./messaging.repository";

@Injectable()
export class MessagingService {
  constructor(private readonly messagingRepo: MessagingRepository) {}

  async list(user: User, u1?: string, u2?: string) {
    if ((u1 == null) != (u2 == null)) {
      throw new BadRequestException(
        "Kötelező u1 vagy u2 paraméter megadása, ha az egyiket megadjuk!",
      );
    }
    if (user.isAdmin || u1 === user.email || u2 === user.email) {
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
    });
  }
}
