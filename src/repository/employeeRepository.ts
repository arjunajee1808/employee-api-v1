import { Db } from "mongodb";
import { Cache } from "../cache";
import { IEmployee, IEmployeeDocument } from "../entity/Employee";

export class EmployeeRepository {
  private db: Db;
  private cache: Cache;

  constructor() {
    this.cache = Cache.getInstance();
    const connection = this.cache.getConnection().connection;
    if (!connection?.db) {
      throw new Error("Database not connected");
    }
    this.db = connection.db;
  }

  private getCollection() {
    return this.db.collection("employees");
  }

  public async findAll(): Promise<IEmployeeDocument[]> {
    const results = await this.getCollection().find({}).toArray();
    return results.map((doc) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: doc._id,
    }));
  }

  public async findById(id: number): Promise<IEmployeeDocument | null> {
    const doc = await this.getCollection().findOne({ id });
    if (!doc) return null;

    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: doc._id,
    };
  }

  public async findByEmail(email: string): Promise<IEmployeeDocument | null> {
    const doc = await this.getCollection().findOne({ email });
    if (!doc) return null;

    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: doc._id,
    };
  }

  public async create(employeeData: IEmployee): Promise<IEmployeeDocument> {
    const lastEmployee = await this.getCollection().findOne(
      {},
      { sort: { id: -1 } }
    );
    const newId = lastEmployee ? lastEmployee.id + 1 : 1;

    const newEmployee = {
      ...employeeData,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.getCollection().insertOne(newEmployee);
    return { ...newEmployee, _id: result.insertedId };
  }

  public async update(
    id: number,
    employeeData: Partial<IEmployee>
  ): Promise<IEmployeeDocument | null> {
    const updateData = { ...employeeData, updatedAt: new Date() };
    await this.getCollection().updateOne({ id }, { $set: updateData });
    const doc = await this.getCollection().findOne({ id });
    if (!doc) return null;

    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      _id: doc._id,
    };
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.getCollection().deleteOne({ id });
    return result.deletedCount > 0;
  }
}
