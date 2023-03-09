import { cfg } from "src/config/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "oracle",
  name: cfg().db.name,
  host: "localhost",
  port: 2,
});
