import { Deal } from "../model";
import { Order } from "../model";

export interface OrderServiceInterface {
  createOrders(deals: Deal[]): Promise<Order[][]>;
}
