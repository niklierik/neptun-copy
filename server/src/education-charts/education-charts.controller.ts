import { Controller, Get } from "@nestjs/common";
import { EducationChartsService } from "./education-charts.service";

@Controller("education-charts")
export class EducationChartsController {
  constructor(private readonly eduChartService: EducationChartsService) {}

  @Get()
  async list() {
    return this.eduChartService.list();
  }
}
