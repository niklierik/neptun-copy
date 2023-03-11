import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateMajorDto } from "./dto/create-major.dto";
import { MajorsService } from "./majors.service";

@Controller("majors")
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  async create(@Body() data: CreateMajorDto) {
    return await this.majorsService.create(data);
  }

  @Get("/:id")
  async get(
    @Param("id") id: string,
    @Query("includeUsers") includeUsers: string,
  ) {
    return await this.majorsService.find(id, includeUsers === "true");
  }
}
