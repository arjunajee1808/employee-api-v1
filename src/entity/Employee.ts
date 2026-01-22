export interface IEmployee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEmployeeDocument extends IEmployee {
  _id?: any;
}
