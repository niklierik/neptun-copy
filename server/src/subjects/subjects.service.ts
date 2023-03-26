import { Injectable } from "@nestjs/common";
import { SubjectsRepository } from "./subjects.repository";

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async list() {
    return this.subjectsRepository.find({});
  }
}
