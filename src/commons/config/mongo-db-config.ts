import * as mongoose from "mongoose";

import { envVariablesConfig } from "../config/";

export async function connectMongoose(): Promise<void> {
  try {
    await mongoose.connect(envVariablesConfig.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
}
