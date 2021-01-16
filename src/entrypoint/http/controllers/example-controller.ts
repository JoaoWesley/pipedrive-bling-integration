import { Response } from "express";
import { CREATED } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";

import { DOMAIN_TYPES } from "../../../commons/types";
import { ExampleParams } from "../../../core/domain/model";
import { ExampleService } from "../../../core/domain/service";

@controller("/example")
export class ContextController {
  constructor(
    @inject(DOMAIN_TYPES.ExampleService)
    private _exampleService: ExampleService
  ) {}

  @httpPost("/")
  public async create(
    @requestBody() exampleParams: ExampleParams,
    @response() res: Response
  ): Promise<void> {
    const result = await this._exampleService.exampleMethod(
      exampleParams.idDocument
    );
    if (result) {
      console.log("document already exists");
    }

    return res.status(CREATED).json(result).end();
  }
}
