import { ErrorHandler } from "./errorHandler/errorHandler";
import { Logger } from "./logger/logger";
import { getFlowId } from "./utils/util";

export class Cache {
  private log!: Logger;
  private errorHandler!: ErrorHandler;
  private isFresh = true;

  private setInstance() {
    this.log = new Logger(getFlowId());
    this.errorHandler = new ErrorHandler();
    this.isFresh = false;
  }

  public getCache(): { log: Logger; errorHandler: ErrorHandler } {
    if (this.isFresh) {
      this.setInstance();
    }
    return {
      log: this.log,
      errorHandler: this.errorHandler,
    };
  }
}
