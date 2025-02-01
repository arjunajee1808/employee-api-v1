import { ErrorHandler } from "./errorHandler/errorHandler";
import { iEmployee } from "./interface/iEmployee";
import { iHandler } from "./interface/iHandler";
import { iService } from "./interface/iService";
import { Logger } from "./logger/logger";

export class service {
  private logger: Logger;
  private errorHandler: ErrorHandler;
  constructor({ log, errorHandler }: any) {
    this.logger = log;
    this.errorHandler = errorHandler;
  }
  public getEmployee(): iEmployee[] | any {
    try {
      return [
        {
          name: "John Doe",
          email: "johndoe@abc.com",
          phoneNumber: "1234567890",
        },
        {
          name: "ABD DHF",
          email: "ABDDHF@erj.com",
          phoneNumber: "1234567890",
        },
      ];
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unecpected Error",
      });
      throw new Error(e);
    }
  }
}
