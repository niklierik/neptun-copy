import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { cfg } from "./config/config";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: "oracle",
      host: cfg().db.host,
      port: cfg().db.port,
      username: cfg().db.user,
      password: cfg().db.password,
      database: cfg().db.name,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
