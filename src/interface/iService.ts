import { iEmployee } from "./iEmployee";

export interface iService {
  getEmployee(): iEmployee[];
}
