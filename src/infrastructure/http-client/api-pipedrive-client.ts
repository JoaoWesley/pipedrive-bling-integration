import { inject, injectable } from "inversify";
import * as superagent from "superagent";

import { HTTP_URL_TYPES, INFRA_TYPES } from "../../commons/types";
import { Deal } from "../../core/domain/model/";
import { ApiPipedriveClientInterface } from "../../core/domain/service";

@injectable()
export class ApiPipedriveClient implements ApiPipedriveClientInterface {
  constructor(
    @inject(INFRA_TYPES.SuperAgent)
    private _superagent: superagent.SuperAgent<superagent.SuperAgentRequest>,
    @inject(HTTP_URL_TYPES.ApiPipedriveUrl)
    private _pipedriveUrl: string,
    @inject(HTTP_URL_TYPES.ApiPipedriveToken)
    private _apiPipedriveToken: string
  ) {}

  public async getWonDeals(): Promise<Deal[]> {
    const deals = await this._superagent
      .get(
        `${this._pipedriveUrl}/deals?status=won&api_token=${this._apiPipedriveToken}`
      )
      .set("Accept", "application/json");
    return deals.body.data;
  }
}
