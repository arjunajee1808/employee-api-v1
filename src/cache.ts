import { ErrorHandler } from "./errorHandler/errorHandler";
import { Logger } from "./logger/logger";
import mongoose from "mongoose";
import { config } from "./config/index";

// Singleton Method to hold the instances
export class Cache {
  private static cacheInstance: Cache;
  private log!: Logger;
  private errorHandler!: ErrorHandler;
  private isFresh = false;
  private isConnected = false;
  private mongooseClient: typeof mongoose | null = null;

  private constructor() {
    this.isFresh = true;
  }

  public static getInstance() {
    if (!this.cacheInstance) {
      this.cacheInstance = new Cache();
    }
    return this.cacheInstance;
  }

  private setInstance() {
    this.log = new Logger();
    this.errorHandler = new ErrorHandler();
    this.isFresh = false;
  }

  public getCache(): { log: Logger; errorHandler: ErrorHandler } {
    // If fresh, create the instances for logger, errorhandler.
    if (this.isFresh) {
      this.setInstance();
    }
    return {
      log: this.log,
      errorHandler: this.errorHandler,
    };
  }

  public async initializeDatabase(): Promise<typeof mongoose> {
    if (this.isFresh) {
      this.setInstance();
    }
    console.log("Database URI:", config.database);
    if (!this.isConnected) {
      this.mongooseClient = await mongoose.connect(config.database.uri, {
        dbName: config.database.dbName,
      });
      this.isConnected = true;
    }
    return this.mongooseClient as typeof mongoose;
  }

  public getConnection(): typeof mongoose {
    if (!this.mongooseClient) {
      return mongoose;
    }
    return this.mongooseClient;
  }
}
