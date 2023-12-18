import { Injectable } from '@nestjs/common';
import { MongoService, TargetReqDto } from '@opportunities/shared';
import { InsertOneResult, WithId } from "mongodb";
import moment from 'moment';
@Injectable()
export class AppService {

  constructor(private readonly mongoService: MongoService) {}
  async insertTarget(target: TargetReqDto): Promise<{ message: string | any[] }> {
    const targets = this.mongoService.getTargetsCollection();
    try {
      const now = moment.utc().valueOf();
      const result:InsertOneResult<Document> = await targets.insertOne({ ...target, createdTime: now, updatedTime: now });
      if (result.acknowledged) {
        return { message: 'Target inserted successfully' };
      } else {
        return { message: 'Failed to insert target' };
      }
    } catch (error) {
      console.error('Error inserting target:', error);
      return { message: 'Error inserting target' };
    }
  }
  async updateTarget(target: TargetReqDto): Promise<{ message: string | any[] }> {
    const targets = this.mongoService.getTargetsCollection();
    try {
      const updatedTime = moment.utc().valueOf();
      const result:InsertOneResult<Document> = await targets.insertOne({ ...target, updatedTime: updatedTime });
      if (result.acknowledged) {
        return { message: 'Target inserted successfully' };
      } else {
        return { message: 'Failed to insert target' };
      }
    } catch (error) {
      console.error('Error inserting target:', error);
      return { message: 'Error inserting target' };
    }
  }
}


// insert-target
// pipe:
// sources: {type, providerType, providers: {id, username, name} }

// update-target-source
// pipe:
