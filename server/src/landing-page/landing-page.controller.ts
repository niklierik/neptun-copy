import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/entities/users.entity";
import { LandingPageService } from "./landing-page.service";

@Controller("landing-page")
@UseGuards(AuthGuard())
export class LandingPageController {
  constructor(private readonly landingPageService: LandingPageService) {}

  @Get()
  async get(@CurrentUser() user: User) {
    return this.landingPageService.get(user);
  }
}
