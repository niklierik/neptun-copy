import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { UsersRepository } from "./users.repository";
import { PassportModule } from "@nestjs/passport";
import { readConfig, cfg } from "src/config/config";
import { JwtStrategy } from "./jwt.strategy";
import { MajorsModule } from "src/majors/majors.module";

@Module({
  providers: [UsersService, UsersRepository, JwtStrategy],
  imports: [
    MajorsModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async useFactory(..._args) {
        await readConfig();
        return {
          secret: cfg().jwtSecret,
          signOptions: { expiresIn: cfg().sessionsExpiresIn },
        };
      },
    }),
  ],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
