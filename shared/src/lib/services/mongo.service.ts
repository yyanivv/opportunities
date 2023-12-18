// libs/shared/src/lib/services/mongo.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, MongoClientOptions, ServerApiVersion, WithId } from "mongodb";
import { parseGeneratorString } from "nx/src/command-line/generate/generate";

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  readonly client: MongoClient;
  private db!: Db;

  constructor() {
    const dbName = 'opportunities';
    const dbUsername = 'yaniv';
    const dbPassword = 'f8CS8XfttPSLbLKJ';

    const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbName}.i09k0mo.mongodb.net/?retryWrites=true&w=majority`;
    const options = {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    } as MongoClientOptions;
    this.client = new MongoClient(uri, options);
  }
  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      console.log('Closed MongoDB connection');
    }
  }

  async onModuleInit() {
    await this.connectToDatabase();
  }

  async connectToDatabase() {
    try {
      await this.client.connect();
      await this.client.db('opportunities').command({ ping: 1 });
      this.db = this.client.db('opportunities');
    }catch (error) {
      console.error('db connection error: ', error);
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db;
  }

  getTestCollection() {
    return this.getDb().collection('test');
  }
  getTargetsCollection() {
    return this.getDb().collection('targets');
  }

  getOpportunitiesCollection() {
    return this.getDb().collection('opportunities');
  }

  getContentCollection() {
    return this.getDb().collection('content');
  }

  getFailedOpportunitiesCollection() {
    return this.getDb().collection('failed_opportunities');
  }

  async getTarget(pipe?: string): Promise<{ data: string | Document[] } | {message: string}> {
    try {
      const targets = this.getTargetsCollection()
      const [res]: [WithId<any>[]] = await Promise.all([
        pipe ? targets.find({ pipe: pipe }).toArray()
          : targets.find().toArray()]);
      return { data: res };
    } catch (error) {
      console.error('Error retrieving targets:', error);
      return { message: 'Error retrieving targets' };
    }
  }
}
