import { Response } from "express";
import { CREATED } from "http-status-codes";
import { inject } from "inversify";
import { controller, httpPost, response } from "inversify-express-utils";

import { DOMAIN_TYPES } from "../../../commons/types";
import { DealService } from "../../../core/domain/service";
import { OrderService } from "../../../core/domain/service";

@controller("/orders")
export class OrderController {
  constructor(
    @inject(DOMAIN_TYPES.DealService)
    private _dealService: DealService,
    @inject(DOMAIN_TYPES.OrderService)
    private _orderService: OrderService
  ) {}

  @httpPost("/")
  public async create(@response() res: Response): Promise<void> {
    const deals = await this._dealService.getWonDeals();

    const orders = await this._orderService.createOrders(deals);

    return res.status(CREATED).json(orders).end();
  }
}
