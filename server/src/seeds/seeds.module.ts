import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seeded } from "./seeded.entity";
import { SeedsService } from "./seeds.service";

@Module({
  imports: [TypeOrmModule.forFeature([Seeded])],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
