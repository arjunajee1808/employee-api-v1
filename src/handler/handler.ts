import { ErrorHandler, httpcode, iError } from "../errorHandler/errorHandler";
import { IEmployee } from "../entity/Employee";
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
  public async getEmployees() {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Fetching Employee details",
      });
      const data = await this.service.getEmployees();
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

  public async getEmployee(id: any) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Fetching Employee detail",
      });
      const data = await this.service.getEmployee(id);
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

  public async addEmployee(employee: IEmployee) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Adding Employee",
      });
      const data = await this.service.addEmployee(employee);
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

  public async updateEmployee(id: number, employee: Partial<IEmployee>) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Updating Employee",
      });
      const data = await this.service.updateEmployee(id, employee);
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

  public async deleteEmployee(id: number) {
    try {
      this.logger.LogCustomMessage({
        level: "info",
        message: "Deleting Employee",
      });
      const success = await this.service.deleteEmployee(id);
      this.data = { success, message: success ? "Employee deleted successfully" : "Failed to delete employee" };
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
