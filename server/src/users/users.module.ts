import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { UsersRepository } from "./users.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { MajorsModule } from "src/majors/majors.module";
import { JwtModule } from "@nestjs/jwt";
import { cfg } from "src/config/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

@Module({
  providers: [UsersService, UsersRepository, JwtStrategy],
  imports: [
    MailerModule.forRoot({
      transport: "smtps://user@domain.com:pass@smtp.domain.com",
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MajorsModule,
    TypeOrmModule.forFeature([User]),
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
  ],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule, UsersRepository, UsersService],
})
export class UsersModule {}
