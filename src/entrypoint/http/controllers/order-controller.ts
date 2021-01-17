import { Request, Response } from "express";
import { CREATED, OK, UNPROCESSABLE_ENTITY } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from "inversify-express-utils";

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
    try {
      const deals = await this._dealService.getWonDeals();

      const orders = await this._orderService.createOrder(deals);
      await this._orderService.saveOrder(orders, deals);

      return res.status(CREATED).json(orders).end();
    } catch (error) {
      return res
        .status(UNPROCESSABLE_ENTITY)
        .json({ message: error.message })
        .end();
    }
  }

  @httpGet("/")
  public async find(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    const date = req.query.date as string;
    const orders = await this._orderService.findAllOrders(date);

    return res.status(OK).json(orders).end();
  }
}
