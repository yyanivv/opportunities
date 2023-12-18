// libs/shared/src/lib/shared.module.ts
import { Module } from '@nestjs/common';
import { MongoService } from './services/mongo.service';
import { TwitterService } from "./services/twitter.service";

@Module({
  providers: [MongoService, TwitterService],
  exports: [MongoService, TwitterService],
})
export class SharedModule {}
