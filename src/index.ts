import "reflect-metadata";

import {} from "inversify";

import { startHttp } from "./entrypoint/http/server";
startHttp();
