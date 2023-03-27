import { Injectable } from "@nestjs/common";
import { MessagingRepository } from "./messaging.repository";

@Injectable()
export class MessagingService {
  constructor(private readonly messagingRepo: MessagingRepository) {}

  async list() {
    return this.messagingRepo.find({
      relations: {
        from: true,
        to: true,
      },
    });
  }
}
