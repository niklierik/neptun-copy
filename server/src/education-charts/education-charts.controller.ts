import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EducationChartsService } from "./education-charts.service";

@Controller("education-charts")
@UseGuards(AuthGuard())
export class EducationChartsController {
  constructor(private readonly eduChartService: EducationChartsService) {}

  @Get()
  async list() {
    return this.eduChartService.list();
  }
}
