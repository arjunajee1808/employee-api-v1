import { iEmployee } from "./interface/iEmployee";
import { iHandler } from "./interface/iHandler";
import { iService } from "./interface/iService";

export class service {
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
      throw new Error(e);
    }
  }
}
