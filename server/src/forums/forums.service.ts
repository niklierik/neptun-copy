import { Injectable } from "@nestjs/common";
import { CommonForumRepository } from "./common-forum.repository";
import { ForumRepository } from "./forum.repository";

@Injectable()
export class ForumsService {
  constructor(
    private readonly forumsRepo: ForumRepository,
    private readonly commonForumsRepo: CommonForumRepository,
  ) {}

  async list() {
    return this.forumsRepo.find({});
  }

  async listCommon() {
    return this.commonForumsRepo.find({});
  }
}
