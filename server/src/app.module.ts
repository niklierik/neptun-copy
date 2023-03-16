import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { cfg, readConfig } from "./config/config";
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

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async useFactory(...args) {
        await readConfig();
        return {
          type: "oracle",
          host: cfg().db.host,
          port: cfg().db.port,
          username: cfg().db.user,
          password: cfg().db.password,
          database: cfg().db.name,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          logger: "file",
          schema: cfg().db.schema,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
