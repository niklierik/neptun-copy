import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { cfg, readConfig } from "./config/config";
import { UsersModule } from "./users/users.module";
import { MajorsModule } from "./majors/majors.module";

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
        };
      },
    }),
    MajorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
