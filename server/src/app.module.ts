import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { cfg, createTypeORMModuleCfg } from "./config/config";
import { UsersModule } from "./users/users.module";
import { MajorsModule } from "./majors/majors.module";
import { MessagingModule } from "./messaging/messaging.module";
import { ExamsModule } from "./exams/exams.module";
import { SubjectsModule } from "./subjects/subjects.module";
import { RoomsModule } from "./rooms/rooms.module";
import { CoursesModule } from "./courses/courses.module";
import { ForumsModule } from "./forums/forums.module";
import { NewsModule } from "./news/news.module";
import { EducationChartsModule } from "./education-charts/education-charts.module";
import { MarksModule } from "./marks/marks.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SeedsModule } from "./seeds/seeds.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async useFactory(..._args) {
        return createTypeORMModuleCfg();
      },
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async useFactory(..._args) {
        return {
          secret: cfg().jwtSecret,
          signOptions: { expiresIn: cfg().sessionsExpiresIn },
        };
      },
    }),
    MajorsModule,
    MessagingModule,
    ExamsModule,
    SubjectsModule,
    RoomsModule,
    CoursesModule,
    ForumsModule,
    NewsModule,
    EducationChartsModule,
    MarksModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
