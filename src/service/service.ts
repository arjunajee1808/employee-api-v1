import { Employees } from "../constant";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { iEmployee } from "../interface/iEmployee";
import { Logger } from "../logger/logger";

export class service {
  private logger: Logger;
  private errorHandler: ErrorHandler;
  constructor({ log, errorHandler }: any) {
    this.logger = log;
    this.errorHandler = errorHandler;
  }
  public getEmployee(): iEmployee[] | any {
    try {
      return Employees;
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw new Error(e);
    }
  }
}
