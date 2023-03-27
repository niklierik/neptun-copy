import { Injectable } from "@nestjs/common";
import { CommonNewsRepository } from "./common-news.repository";
import { NewsRepository } from "./news.repository";

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepo: NewsRepository,
    private readonly commonNewsRepo: CommonNewsRepository,
  ) {}

  async list() {
    return this.newsRepo.find({});
  }

  async listCommon() {
    return this.commonNewsRepo.find({});
  }
}
