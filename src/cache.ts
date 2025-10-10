import { ErrorHandler } from "./errorHandler/errorHandler";
import { Logger } from "./logger/logger";
import { getFlowId } from "./utils/index";

// Singleton Method to hold the instances
export class Cache {
  private static cacheInstance: Cache;
  private log!: Logger;
  private errorHandler!: ErrorHandler;
  private isFresh = false;

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
}
