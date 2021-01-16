import { ContainerModule } from "inversify";

import { ExampleRepository } from "../../core/domain/repository";
import { ExampleService } from "../../core/domain/service";
import { ExampleDbRepository } from "../../infrastructure/repository/example-repository";
import { DOMAIN_TYPES, REPOSITORY_TYPES } from "../types";

export function createIocConfig(): ContainerModule {
  return new ContainerModule((bind) => {
    /**
     * Services
     */
    bind<ExampleService>(DOMAIN_TYPES.ExampleService)
      .to(ExampleService)
      .inSingletonScope();

    /**
     * Repositories
     */
    bind<ExampleRepository>(REPOSITORY_TYPES.ExampleDbRepository)
      .to(ExampleDbRepository)
      .inSingletonScope();
  });
}
