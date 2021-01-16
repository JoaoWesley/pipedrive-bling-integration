import { Order } from "../model";

export interface ApiBlingClientInterface {
  createOrder(xml: string): Promise<Order[]>;
}
