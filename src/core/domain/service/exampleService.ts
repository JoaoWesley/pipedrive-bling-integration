import { inject, injectable } from "inversify";

import { REPOSITORY_TYPES } from "../../../commons/types";
import { Example } from "../../domain/model";
import { ExampleRepository } from "../repository/example-repository";

@injectable()
export class ExampleService {
  constructor(
    @inject(REPOSITORY_TYPES.ExampleDbRepository)
    private _exampleRepository: ExampleRepository
  ) {}
  async exampleMethod(idDocument: string): Promise<Example> {
    console.log("method service called");
    return this._exampleRepository.findById(idDocument);
  }
}
