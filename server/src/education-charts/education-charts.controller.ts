import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { EducationChartsService } from "./education-charts.service";

@Controller("education-charts")
@UseGuards(AuthGuard())
export class EducationChartsController {
  constructor(private readonly eduChartService: EducationChartsService) {}

  @Get("/:subject")
  async getForSubject(
    @Param("subject") subject: string,
    @CurrentUser() user: User,
  ) {
    return this.eduChartService.getForSubject(subject, user);
  }

  @Get()
  async list() {
    return this.eduChartService.list();
  }
}
