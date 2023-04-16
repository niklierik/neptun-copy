import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { StudiesService } from "./studies.service";

@Controller("studies")
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Get()
  async listStudies(@CurrentUser() user: User) {
    return this.studiesService.listStudies(user);
  }
}
