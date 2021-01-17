import { injectable } from "inversify";

import { OrderDb } from "../../core/domain/model";
import { OrderRepository } from "../../core/domain/repository";
import ordersDbModel from "./models/orders-db-model";

@injectable()
export class OrderDbRepository implements OrderRepository {
  public async save(order: OrderDb): Promise<void> {
    await ordersDbModel.create(order);
  }

  public async findOne(date: string): Promise<OrderDb> {
    return ordersDbModel.findOne({ date });
  }

  public async findAll(date: string): Promise<OrderDb[]> {
    if (date) {
      return ordersDbModel.find({ date }).sort({ _id: -1 });
    }
    return ordersDbModel.find().sort({ _id: -1 });
  }

  public async findOneAndUpdate(date: string, orderDb: OrderDb): Promise<void> {
    await ordersDbModel.findOneAndUpdate({ date }, orderDb);
  }
}
