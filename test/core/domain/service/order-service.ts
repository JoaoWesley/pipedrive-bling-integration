/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";

import { expect, use as chaiUse } from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chaiUse(sinonChai);

import { Deal, Order } from "../../../../src/core/domain/model/";
import { OrderService } from "../../../../src/core/domain/service";

describe("OrderService. #createOrder", () => {
  let sandbox: sinon.SinonSandbox;
  let apiBlingClient: any;
  let orderDbRepository: any;
  let dealService: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    apiBlingClient = {
      createOrder: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should create order successfully", async () => {
    const order = {
      pedido: {
        numero: "44",
        idPedido: 10937385596,
        codigos_rastreamento: {
          codigo_rastreamento: null,
        },
      },
    } as Order;

    apiBlingClient.createOrder.returns(order);

    const orderService = new OrderService(
      apiBlingClient,
      orderDbRepository,
      dealService
    );

    const deals = [
      {
        org_id: {
          name: "Organization Example 2",
        },
        creator_user_id: {
          email: "joaowesley527@gmail.com",
        },
        value: 100,
      },
    ] as Deal[];

    const orderReturn = await orderService.createOrder(deals);

    expect(orderReturn.pop()).to.be.deep.equal(order);
    expect(apiBlingClient.createOrder).to.be.calledOn;
  });
});

describe("OrderService. #saveOrder", () => {
  let sandbox: sinon.SinonSandbox;
  let apiBlingClient: any;
  let orderDbRepository: any;
  let dealService: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    apiBlingClient = {
      createOrder: sandbox.stub(),
    };

    dealService = {
      getTotalDealsValue: sandbox.stub(),
    };

    orderDbRepository = {
      save: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should save order in db successfully", async () => {
    const orders = [
      {
        pedido: {
          numero: "44",
          idPedido: 10937385596,
          codigos_rastreamento: {
            codigo_rastreamento: null,
          },
        },
      },
    ] as Order[];

    const orderService = new OrderService(
      apiBlingClient,
      orderDbRepository,
      dealService
    );

    const deals = [
      {
        org_id: {
          name: "Organization Example 2",
        },
        creator_user_id: {
          email: "joaowesley527@gmail.com",
        },
        value: 100,
      },
    ] as Deal[];

    sinon.stub(orderService, "findOrderByDate").returns(null);
    dealService.getTotalDealsValue.returns(100);

    await orderService.saveOrder(orders, deals);

    expect(orderDbRepository.save).to.be.calledOn;
  });
});

describe("OrderService. #updateOrder", () => {
  let sandbox: sinon.SinonSandbox;
  let apiBlingClient: any;
  let orderDbRepository: any;
  let dealService: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    apiBlingClient = {};

    dealService = {
      getTotalDealsValue: sandbox.stub(),
    };

    orderDbRepository = {
      findOneAndUpdate: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should update order in db successfully", async () => {
    const orders = [
      {
        pedido: {
          numero: "44",
          idPedido: 10937385596,
          codigos_rastreamento: {
            codigo_rastreamento: null,
          },
        },
      },
    ] as Order[];

    const orderService = new OrderService(
      apiBlingClient,
      orderDbRepository,
      dealService
    );

    sinon.stub(orderService, "findOrderByDate").returns(null);
    dealService.getTotalDealsValue.returns(100);

    await orderService.updateOrder(
      {
        orders: orders,
        total: 1000,
        date: "2021-01-01",
      },
      [...orders],
      100
    );

    expect(orderDbRepository.findOneAndUpdate).to.be.calledOn;
  });
});
