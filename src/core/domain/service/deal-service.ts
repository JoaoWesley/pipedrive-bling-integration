import { inject, injectable } from "inversify";

import { INFRA_TYPES } from "../../../commons/types";
import { Deal } from "../model";
import { ApiPipedriveClientInterface } from ".";
import { DealServiceInterface } from ".";

@injectable()
export class DealService implements DealServiceInterface {
  constructor(
    @inject(INFRA_TYPES.ApiPipedriveClient)
    private _apiPipedriveClient: ApiPipedriveClientInterface
  ) {}
  async getWonDeals(): Promise<Deal[]> {
    const deals = await this._apiPipedriveClient.getWonDeals();
    return deals;
  }

  getTotalDealsValue(deals: Deal[]): number {
    let totalDealsValue = 0;
    deals.forEach((deal) => {
      totalDealsValue += deal.value;
    });
    return totalDealsValue;
  }
}
