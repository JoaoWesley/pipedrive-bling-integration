import { Deal } from "../model";
import { Order } from "../model";

export interface OrderServiceInterface {
  createOrder(deals: Deal[]): Promise<Order[]>;
}
