import { Module } from "@nestjs/common";
import { CoursesModule } from "src/courses/courses.module";
import { SubjectsModule } from "src/subjects/subjects.module";
import { UsersModule } from "src/users/users.module";
import { LandingPageController } from "./landing-page.controller";
import { LandingPageService } from "./landing-page.service";

@Module({
  imports: [CoursesModule, SubjectsModule, UsersModule],
  controllers: [LandingPageController],
  providers: [LandingPageService],
})
export class LandingPageModule {}
