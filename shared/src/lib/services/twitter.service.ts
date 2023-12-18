// libs/shared/src/lib/services/twitter.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService implements OnModuleInit, OnModuleDestroy {
  private readonly twitterClient: TwitterApi;
  // protected openAiAPIKey: string = process.env.OPEN_AI || '';
  // protected xCustomerKey: string = process.env.X_CUSTOMER_KEY || '';
  // protected xCustomerSecret: string = process.env.X_CUSTOMER_SECRET || '';
  protected xBearerToken: string = process.env['X_BEARER_TOKEN']
    || 'AAAAAAAAAAAAAAAAAAAAAN8DqwEAAAAAC3Q8%2B8qTY9HU1%2FfrkpV4ea7Toyg%3D4B09On5VgjB7z3codm0szNRmn4s0NHYk19tjuFt1bgcyDdk2pE';

  constructor() {
    this.twitterClient = new TwitterApi(this.xBearerToken);
  }
  async onModuleDestroy() {
    if (this.twitterClient) {
      console.log('Destroy twitterClient: ', this.twitterClient);
    }
  }

  async onModuleInit() {
    await this.createTwitterClient();
  }

  async createTwitterClient() {
    try {
      console.log('createTwitterClient: ', this.twitterClient);
    }catch (error) {
      console.error('Create Twitter Client error: ', error);
    }
  }

  async getUserByUsername() {
    const readOnlyClient = this.twitterClient.readOnly;
    const user = await readOnlyClient.v2.userTimeline('1613209963312340992');
    console.log(user);
    return user
  }

}
