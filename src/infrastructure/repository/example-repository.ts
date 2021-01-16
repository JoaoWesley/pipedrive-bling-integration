import { injectable } from "inversify";
import { ObjectId } from "mongodb";

import { Example } from "../../core/domain/model";
import { ExampleRepository } from "../../core/domain/repository";
import exampleModel from "./models/example-model";

@injectable()
export class ExampleDbRepository implements ExampleRepository {
  public async findById(idDocument: string): Promise<Example> {
    const result = await exampleModel.findById(new ObjectId(idDocument));
    return result;
  }
}
