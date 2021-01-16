import { Deal } from "../model";

export interface ApiPipedriveClientInterface {
  getWonDeals(): Promise<Deal[]>;
}
