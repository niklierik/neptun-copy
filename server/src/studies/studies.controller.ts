import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { StudiesService } from "./studies.service";

@Controller("studies")
@UseGuards(AuthGuard())
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Get()
  async listStudies(@CurrentUser() user: User) {
    return this.studiesService.listStudies(user);
  }
}
