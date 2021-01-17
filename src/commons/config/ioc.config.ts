import { ContainerModule } from "inversify";
import * as superagent from "superagent";

import { OrderRepository } from "../../core/domain/repository";
import {
  ApiBlingClientInterface,
  ApiPipedriveClientInterface,
  DealService,
  DealServiceInterface,
  OrderService,
  OrderServiceInterface,
} from "../../core/domain/service";
import {
  ApiBlingClient,
  ApiPipedriveClient,
} from "../../infrastructure/http-client/";
import { OrderDbRepository } from "../../infrastructure/repository/order-db-repository";
import { envVariablesConfig } from "../config/";
import {
  DOMAIN_TYPES,
  HTTP_URL_TYPES,
  INFRA_TYPES,
  REPOSITORY_TYPES,
} from "../types";

export function createIocConfig(): ContainerModule {
  return new ContainerModule((bind) => {
    /**
     * Services
     */
    bind<DealServiceInterface>(DOMAIN_TYPES.DealService)
      .to(DealService)
      .inSingletonScope();

    bind<OrderServiceInterface>(DOMAIN_TYPES.OrderService)
      .to(OrderService)
      .inSingletonScope();

    /**
     * Repositories
     */
    bind<OrderRepository>(REPOSITORY_TYPES.OrderDbRepository)
      .to(OrderDbRepository)
      .inSingletonScope();

    /**
     * Infra
     */
    bind<superagent.SuperAgent<superagent.SuperAgentRequest>>(
      INFRA_TYPES.SuperAgent
    ).toConstantValue(superagent);

    bind<ApiPipedriveClientInterface>(INFRA_TYPES.ApiPipedriveClient).to(
      ApiPipedriveClient
    );

    bind<ApiBlingClientInterface>(INFRA_TYPES.ApiBlingClient).to(
      ApiBlingClient
    );

    /**
     * Environment
     */

    bind<string>(HTTP_URL_TYPES.ApiPipedriveUrl).toConstantValue(
      envVariablesConfig.API_PIPEDRIVE_URL
    );

    bind<string>(HTTP_URL_TYPES.ApiPipedriveToken).toConstantValue(
      envVariablesConfig.API_PIPEDRIVE_TOKEN
    );

    bind<string>(HTTP_URL_TYPES.ApiBlingUrl).toConstantValue(
      envVariablesConfig.API_BLING_URL
    );

    bind<string>(HTTP_URL_TYPES.ApiBlingKey).toConstantValue(
      envVariablesConfig.API_BLING_KEY
    );
  });
}
