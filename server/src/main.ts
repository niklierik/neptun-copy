import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { cfg, readConfig } from "./config/config";

async function bootstrap() {
  await readConfig();
  console.log(JSON.stringify(cfg()));
  const app = await NestFactory.create(AppModule);
  await app.listen(cfg().port);
  Logger.log("Neptun++ backend server started...");
}
bootstrap();
