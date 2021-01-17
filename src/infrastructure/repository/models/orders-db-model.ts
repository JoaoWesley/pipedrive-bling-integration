import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

import { OrderDb } from "../../../core/domain/model";

export interface OrderModel extends Document, OrderDb {}

const OrderDbSchema: Schema = new Schema(
  {
    orders: { type: Array, required: true },
    total: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { collection: "orders" }
);

export default mongoose.model<OrderModel>("orders", OrderDbSchema);
