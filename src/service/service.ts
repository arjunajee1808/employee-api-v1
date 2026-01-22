import { EmployeeRepository } from "../repository/employeeRepository";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { IEmployee } from "../entity/Employee";
import { Logger } from "../logger/logger";

export class service {
  private logger: Logger;
  private errorHandler: ErrorHandler;
  private employeeRepository: EmployeeRepository;
  constructor() {
    this.logger = new Logger();
    this.errorHandler = new ErrorHandler();
    this.employeeRepository = new EmployeeRepository();
  }
  public async getEmployees(): Promise<IEmployee[]> {
    try {
      return await this.employeeRepository.findAll();
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw new Error(e);
    }
  }
  public async getEmployee(id: number): Promise<IEmployee | null> {
    try {
      const employee = await this.employeeRepository.findById(id);
      if (!employee) {
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

  public async addEmployee(employee: IEmployee): Promise<IEmployee> {
    try {
      if (employee.email) {
        const existingEmployee = await this.employeeRepository.findByEmail(
          employee.email
        );
        if (existingEmployee) {
          throw { statusCode: 400, message: "Emp:ALREADY_EXISTS" };
        }
      }
      return await this.employeeRepository.create(employee);
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw e;
    }
  }

  public async updateEmployee(id: number, employee: Partial<IEmployee>): Promise<IEmployee | null> {
    try {
      const existingEmployee = await this.employeeRepository.findById(id);
      if (!existingEmployee) {
        throw { statusCode: 404, message: "Emp:NOT_FOUND" };
      }
      
      if (employee.email && employee.email !== existingEmployee.email) {
        const emailExists = await this.employeeRepository.findByEmail(employee.email);
        if (emailExists) {
          throw { statusCode: 400, message: "Emp:EMAIL_ALREADY_EXISTS" };
        }
      }
      
      return await this.employeeRepository.update(id, employee);
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw e;
    }
  }

  public async deleteEmployee(id: number): Promise<boolean> {
    try {
      const existingEmployee = await this.employeeRepository.findById(id);
      if (!existingEmployee) {
        throw { statusCode: 404, message: "Emp:NOT_FOUND" };
      }
      
      return await this.employeeRepository.delete(id);
    } catch (e: any) {
      this.logger.LogCustomMessage({
        level: "error",
        message: e.message || "Unexpected Error",
      });
      throw e;
    }
  }
}
