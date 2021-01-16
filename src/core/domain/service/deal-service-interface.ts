import { Deal } from "../model";

export interface DealServiceInterface {
  getWonDeals(): Promise<Deal[]>;
}
