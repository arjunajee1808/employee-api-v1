import { IEmployee } from "../entity/Employee";

export interface iService {
  getEmployees(): Promise<IEmployee[]>;
  getEmployee(id: any): Promise<IEmployee | null>;
}
