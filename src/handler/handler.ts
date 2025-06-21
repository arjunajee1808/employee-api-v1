import { ErrorHandler, httpcode, iError } from "../errorHandler/errorHandler";
import { iEmployee } from "../interface/iEmployee";
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
  public getEmployees() {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Fetching Employee details",
      });
      const data = this.service.getEmployees();
      this.data = data;
      this.logger.LogCustomMessage({
        level: "debug",
        message: "Response to be sent: ",
        details: this.data,
      });
      this.logger.LogOperationSuccess();
    } catch (error: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: error.message || error,
      });

      if (error.statusCode) {
        this.statusCode = error.statusCode;
        this.data = error;
      } else {
        this.statusCode = httpcode.STS_INT_SRV_ERR;
        this.data = this.errorHandler.InterServerError(
          error || "Unexpected Error"
        );
      }
    }
  }

  public getEmployee(id: any) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Fetching Employee detail",
      });
      const data = this.service.getEmployee(id);
      this.data = data;
      this.logger.LogCustomMessage({
        level: "debug",
        message: "Response to be sent: ",
        details: this.data,
      });
      this.logger.LogOperationSuccess();
    } catch (error: any) {
      this.logger.LogCustomMessage({
        level: "Error Details: ",
        message: error.message || error,
      });

      if (error.statusCode) {
        this.statusCode = error.statusCode;
        this.data = error;
      } else {
        this.statusCode = httpcode.STS_INT_SRV_ERR;
        this.data = this.errorHandler.InterServerError(
          error || "Unexpected Error"
        );
      }
    }
  }

  public addEmployee(employee: iEmployee) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Adding Employee",
      });
      const data = this.service.addEmployee(employee);
      this.data = data;
      this.logger.LogCustomMessage({
        level: "debug",
        message: "Response to be sent: ",
        details: this.data,
      });
      this.logger.LogOperationSuccess();
    } catch (error: any) {
      this.logger.LogCustomMessage({
        level: "Error Details: ",
        message: error.message || error,
      });

      if (error.statusCode) {
        this.statusCode = error.statusCode;
        this.data = error;
      } else {
        this.statusCode = httpcode.STS_INT_SRV_ERR;
        this.data = this.errorHandler.InterServerError(
          error || "Unexpected Error"
        );
      }
    }
  }

  public toHandlerResponse(): iHandlerResponse {
    return { status: this.statusCode, details: this.data };
  }
}
