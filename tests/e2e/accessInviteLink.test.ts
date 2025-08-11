import { accessInviteController } from "../../src/controllers/accessInviteController";
import { redis } from "../../src/lib/redis";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/redis", () => ({
  redis: { hincrby: jest.fn() }
}));

describe("E2E - AccessInviteLink", () => {
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

  it("should redirect with status 302 and referrer on URL", async () => {
    const req = { params: { subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc" } } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (redis.hincrby as jest.Mock).mockResolvedValue(1)
    await accessInviteController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(302);
    expect(redis.hincrby).toHaveBeenCalledWith(
      "referral:access-count",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
      1
    )
    expect(res.redirect).toHaveBeenCalledWith(
      "http://localhost:3000/?referrer=8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
    );
  });
});
