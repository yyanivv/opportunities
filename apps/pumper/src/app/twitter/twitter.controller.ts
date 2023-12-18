import { Controller, Get, Query } from "@nestjs/common";

import { TwitterService } from './twitter.service';

@Controller()
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('/twitter/userlookup/:username')
  userLookup(@Query('username') username: string) {
    return this.twitterService.userLookup(username);
  }
}
