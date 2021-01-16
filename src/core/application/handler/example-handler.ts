import { CommandHandler } from "@brainhubeu/sqrs";
import { inject } from "inversify";

import { DOMAIN_TYPES } from "../../../commons/types";
import { ExampleService } from "../../../core/domain/service";
import { Example } from "../../domain/model";
import { ExampleCommand } from "../command/example-command";

export class ExampleHandler implements CommandHandler<ExampleCommand> {
  constructor(
    @inject(DOMAIN_TYPES.ExampleService)
    private _exampleService: ExampleService
  ) {}
  handle(command: ExampleCommand): void | Promise<void> {
    console.log("my command", command.foo);
  }
}
