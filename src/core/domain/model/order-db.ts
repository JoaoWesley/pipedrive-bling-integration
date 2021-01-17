import { Order } from "../model/";

export interface OrderDb {
  orders: Order[];
  total: number;
  date: string;
}
