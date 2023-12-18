import { Body, Controller, Get, HttpCode, Post, Query, ValidationPipe } from "@nestjs/common";
import { AppService } from './app.service';
import { MongoService, TargetReqDto, TwitterService } from "@opportunities/shared";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mongoService: MongoService,
    private readonly twitterService: TwitterService,
  ) {}

  @Post('/target')
  @HttpCode(204)
  async updateTarget(@Body(ValidationPipe) requestBody: TargetReqDto): Promise<{message: string | any[]}> {
    return this.appService.insertTarget(requestBody);
  }

  @Put('/target')
  @HttpCode(204)
  async insertTarget(@Body(ValidationPipe) requestBody: TargetReqDto): Promise<{message: string | any[]}> {
    return this.appService.insertTarget(requestBody);
  }

  @Get('/target')
  @HttpCode(200)
  async getTarget(@Query('pipe') pipe?:string ): Promise<{ data: string | Document[] } | {message: string}> {
    return this.mongoService.getTarget(pipe);
  }

  @Get('/find-opportunities')
  @HttpCode(200)
  async findOpportunities(): Promise<unknown> {
    return await this.twitterService.getUserByUsername();
  }


}
