import { getSubscriberRankingPositionController } from "../../src/controllers/getSubscriberRankingPositionController";
import { redis } from "../../src/lib/redis";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/redis", () => ({
  redis: { zrevrank: jest.fn() }
}));

describe("E2E - getSubscriberRankingPosition", () => {
  const mockRes = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get subscriber rank position", async () => {
    const req = { params: { subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc" } } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (redis.zrevrank as jest.Mock).mockResolvedValue(1)
    await getSubscriberRankingPositionController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(redis.zrevrank).toHaveBeenCalledWith(
      "referral:ranking",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.json).toHaveBeenCalledWith({ position: 2 });
  });
});
