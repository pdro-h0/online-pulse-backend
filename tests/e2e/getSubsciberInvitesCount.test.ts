import { getSubscriberInvitesCountController } from "../../src/controllers/getSubsciberInvitesCount";
import { redis } from "../../src/lib/redis";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/redis", () => ({
  redis: { zscore: jest.fn() }
}));

describe("E2E - getSubsciberInvitesCount", () => {
  const mockRes = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn();
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the invites count", async () => {
    const req = { params: { subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc" } } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (redis.zscore as jest.Mock).mockResolvedValue(1)
    await getSubscriberInvitesCountController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(redis.zscore).toHaveBeenCalledWith(
      "referral:ranking",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.json).toHaveBeenCalledWith({ count: 1 });
  });
});
