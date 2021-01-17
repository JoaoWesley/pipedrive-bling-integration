import "reflect-metadata";

import { expect, use as chaiUse } from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chaiUse(sinonChai);

import { Deal } from "../../../../src/core/domain/model/";
import { DealService } from "../../../../src/core/domain/service";

describe("DealService. #getWonDeals", () => {
  let sandbox: sinon.SinonSandbox;
  let apiPipedriveClient: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    apiPipedriveClient = {
      getWonDeals: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return with success won deals", async () => {
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

    apiPipedriveClient.getWonDeals.returns(deals);

    const dealService = new DealService(apiPipedriveClient);

    const dealsReturn = await dealService.getWonDeals();

    expect(dealsReturn).to.be.deep.equal(deals);
    expect(apiPipedriveClient.getWonDeals).to.be.calledOn;
  });
});
