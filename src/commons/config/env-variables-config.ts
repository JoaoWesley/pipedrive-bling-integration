import * as dotEnv from "dotenv";

dotEnv.config();

export default {
  APP_ENV: process.env.APP_ENV,
  PORT: parseInt(process.env.PORT),
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  API_PIPEDRIVE_URL: process.env.API_PIPEDRIVE_URL,
  API_PIPEDRIVE_TOKEN: process.env.API_PIPEDRIVE_TOKEN,
  API_BLING_URL: process.env.API_BLING_URL,
  API_BLING_KEY: process.env.API_BLING_KEY,
};
