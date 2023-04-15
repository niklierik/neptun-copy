import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SubjectsService } from "./subjects.service";

@Controller("subjects")
@UseGuards(AuthGuard())
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  /**
   *
   * @param year finds year in string like "2023"
   * @param semester finds semester in string like "1" or "FALL" (any case)
   * @returns
   */
  @Get()
  async list(
    @Query("year") year?: string,
    @Query("semester") semester?: string,
  ) {
    return this.subjectsService.list(year, semester);
  }
}
