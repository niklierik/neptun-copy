import { Injectable } from "@nestjs/common";
import { MajorsRepository } from "./majors.repository";

@Injectable()
export class MajorsService {
  constructor(private readonly majorsRepository: MajorsRepository) {}

  async create(data: any) {
    return this.majorsRepository.createMajor(data);
  }

  async find(id: string, includeUsers: boolean) {
    const res = await this.majorsRepository.findById(id, includeUsers);
    if (!includeUsers) {
      delete res.users;
    }
    return res;
  }
}
