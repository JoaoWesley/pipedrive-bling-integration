import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

import { Example } from "../../../core/domain/model";

export interface ExampleModel extends Document, Example {}

const ExampleSchema: Schema = new Schema(
  {
    idDocument: { type: String, required: true, unique: true },
    foo: { type: String, required: true },
    bar: { type: String, required: true },
  },
  { collection: "example-collection" }
);

export default mongoose.model<ExampleModel>("example", ExampleSchema);
