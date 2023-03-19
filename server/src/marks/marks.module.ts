import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mark } from "./mark.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
})
export class MarksModule {}
