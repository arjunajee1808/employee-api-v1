import { iEmployee } from "./iEmployee";

export interface iService {
  getEmployees(): iEmployee[];
  getEmployee(id: any): iEmployee;
}
