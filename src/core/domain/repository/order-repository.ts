import { OrderDb } from "../model";

export interface OrderRepository {
  save(order: OrderDb): Promise<void>;
  findOne(date: string): Promise<OrderDb>;
  findAll(date: string): Promise<OrderDb[]>;
  findOneAndUpdate(date: string, orderDb: OrderDb): Promise<void>;
}
