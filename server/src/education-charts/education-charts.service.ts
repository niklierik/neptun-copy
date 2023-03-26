import { Injectable } from "@nestjs/common";
import { EducationChartsRepository } from "./education-chart.repository";

@Injectable()
export class EducationChartsService {
  constructor(private readonly eduChartsRepo: EducationChartsRepository) {}

  async list() {
    return this.eduChartsRepo.find({
      relations: {
        subject: {
          news: false,
          courses: false,
          forum: false,
        },
        major: {
          users: false,
        },
      },
    });
  }
}
