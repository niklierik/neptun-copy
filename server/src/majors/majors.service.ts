import { ForbiddenException, Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { User } from "src/users/entities/users.entity";
import { CreateMajorDto } from "./dto/create-major.dto";
import { MajorsRepository } from "./majors.repository";

@Injectable()
export class MajorsService {
  constructor(private readonly majorsRepository: MajorsRepository) {}

  async create(data: CreateMajorDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }
    return this.majorsRepository.createMajor(data);
  }

  async find(id: string, includeUsers: boolean) {
    const res = await this.majorsRepository.findById(id, includeUsers);
    if (res == null) {
      throw new NotFoundException();
    }
    if (!includeUsers) {
      delete (res as any).users;
    }
    return res;
  }

  async list() {
    const res = await this.majorsRepository.find({});
    return res;
  }
}
