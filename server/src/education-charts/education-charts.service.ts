import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
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

  async getForSubject(subject: string, user: User) {
    const res = await this.eduChartsRepo.findOne({
      where: {
        subject: { id: subject },
        major: {
          majorID: user.major.majorID,
        },
      },
      loadEagerRelations: false,
      relations: {
        major: true,
        subject: true,
      },
    });
    return res;
  }
}
