import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { cfg } from "./config/config";
import { SeedsService } from "./seeds/seeds.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  await app.listen(cfg().port);
  Logger.log("Neptun++ backend server started...");
  if (cfg().seed) {
    const service = app.get(SeedsService);
    await service.seed();
  }
}
bootstrap();
