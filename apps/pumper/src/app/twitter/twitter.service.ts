import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ITarget, MongoService } from "@opportunities/shared";

@Injectable()
export class TwitterService implements OnModuleInit, OnModuleDestroy {
  private readonly twitterClient: TwitterApi;
  protected xBearerToken: string = process.env['X_BEARER_TOKEN']
    || 'AAAAAAAAAAAAAAAAAAAAAN8DqwEAAAAAFL%2FcBb3Gat3U5dZgG02eYqpO%2B2A%3DOKjKxDJKTQPQ2riVk8bYSCJx342m5xiJlQq0ZmAsNzygnSBBdj';

  constructor(
    private readonly mongoService: MongoService
  ) {
    this.twitterClient = new TwitterApi(this.xBearerToken);
  }
  async onModuleDestroy() {
    if (this.twitterClient) {
      console.log('Destroy Twitter Client: ', this.twitterClient);
    }
  }

  async onModuleInit() {
    await this.sync();
    await this.getUserByUsername();
  }

  async sync() {
    // sync content
    const data = await this.mongoService.getTarget("twitter");
    const targets:ITarget[] = data["data"];
    for(const target of targets) {
      console.log(target.sources);
    }
  }
  async userLookup(username: string) {
    const readOnlyClient = this.twitterClient.readOnly;
    return await readOnlyClient.v2.userByUsername(username);
  }

  async getUserByUsername() {
    const readOnlyClient = this.twitterClient.readOnly;
    const user = await readOnlyClient.v2.userTimeline('1613209963312340992');
    console.log(user);
    return user
  }

}
