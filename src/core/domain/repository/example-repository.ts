import { Example } from "../model";

export interface ExampleRepository {
  findById(idDocument: string): Promise<Example>;
}
