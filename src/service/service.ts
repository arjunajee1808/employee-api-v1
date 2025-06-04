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
  public getEmployees(): iEmployee[] | any {
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
  public getEmployee(id: any): iEmployee | any {
    try {
      const employee: iEmployee[] = Employees.filter(
        (employee) => employee.id == id
      );
      if (!employee.length) {
        throw { statusCode: 404, message: "Emp:NOT_FOUND" };
      } else {
        return employee;
      }
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw e;
    }
  }

  public addEmployee(employee: iEmployee): string | any {
    try {
      Employees.push(employee);
      return "Added";
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw e;
    }
  }
}
