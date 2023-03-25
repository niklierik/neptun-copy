import { AppModule } from "src/app.module";

export class Seeding {
  id: number;
  functionToRun: (qr: AppModule) => Promise<void>;
}
