import { getSubscriberInvitesClicksClickController } from "../../src/controllers/getSubscriberInvitesClicksController";
import { redis } from "../../src/lib/redis";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/redis", () => ({
  redis: { hget: jest.fn() }
}));

describe("E2E - getSubscriberInvitesClicks", () => {
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

  it("should return the amount of invites clicks ", async () => {
    const req = { params: { subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc" } } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (redis.hget as jest.Mock).mockResolvedValue(1)
    await getSubscriberInvitesClicksClickController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(redis.hget).toHaveBeenCalledWith(
      "referral:access-count",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.json).toHaveBeenCalledWith({ count: 1 });
  });
});
