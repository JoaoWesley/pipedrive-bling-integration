import { inject, injectable } from "inversify";
import * as superagent from "superagent";

import { HTTP_URL_TYPES, INFRA_TYPES } from "../../commons/types";
import { Order } from "../../core/domain/model/";
import { ApiBlingClientInterface } from "../../core/domain/service";

@injectable()
export class ApiBlingClient implements ApiBlingClientInterface {
  constructor(
    @inject(INFRA_TYPES.SuperAgent)
    private _superagent: superagent.SuperAgent<superagent.SuperAgentRequest>,
    @inject(HTTP_URL_TYPES.ApiBlingUrl)
    private _apiBlingUrl: string,
    @inject(HTTP_URL_TYPES.ApiBlingKey)
    private _apiBlingKey: string
  ) {}

  public async createOrder(xml: string): Promise<Order> {
    const data = await this._superagent
      .post(`${this._apiBlingUrl}/pedido/json/`)
      .send(`apikey=${this._apiBlingKey}`)
      .send(`xml=${xml}`);
    return data.body.retorno.pedidos[0];
  }
}
