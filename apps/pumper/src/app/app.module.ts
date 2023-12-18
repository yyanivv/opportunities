import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from "@opportunities/shared";
import { TwitterService } from "./twitter/twitter.service";
import { TwitterController } from "./twitter/twitter.controller";

@Module({
  imports: [SharedModule],
  controllers: [
    AppController,
    TwitterController
  ],
  providers: [
    AppService,
    TwitterService
  ],
})
export class AppModule {}
