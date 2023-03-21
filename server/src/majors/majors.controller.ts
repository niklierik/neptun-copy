import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { CreateMajorDto } from "./dto/create-major.dto";
import { MajorsService } from "./majors.service";

@Controller("majors")
@UseGuards(AuthGuard())
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  async create(@Body() data: CreateMajorDto, @CurrentUser() user: User) {
    return await this.majorsService.create(data, user);
  }

  @Get("/:id")
  async getById(
    @Param("id") id: string,
    @Query("includeUsers") includeUsers: string,
  ) {
    return await this.majorsService.find(id, includeUsers === "true");
  }

  @Get()
  async get() {
    return await this.majorsService.list();
  }
}
