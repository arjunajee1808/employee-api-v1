import { ErrorHandler, httpcode } from "../errorHandler/errorHandler";
import { iHandler, iHandlerResponse } from "../interface/iHandler";
import { Logger } from "../logger/logger";

export class handler {
  private service: any;
  private logger: Logger;
  private errorHandler: ErrorHandler;
  private statusCode: number = httpcode.STS_OK;
  private data: any;
  constructor({ serviceInstance, log, errorHandler }: iHandler) {
    this.service = serviceInstance;
    this.logger = log;
    this.errorHandler = errorHandler;
  }

  /* This function return the list employees */
  public getEmployee() {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Fetching Employee details",
      });
      const data = this.service.getEmployee();
      this.logger.LogOperationSuccess();
      this.data = data;
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || e,
      });

      this.statusCode = httpcode.STS_INT_SRV_ERR;
      this.data = this.errorHandler.InterServerError(e || "Unexpected Error");
    }
  }

  public toHandlerResponse(): iHandlerResponse {
    return { status: this.statusCode, details: this.data };
  }
}
