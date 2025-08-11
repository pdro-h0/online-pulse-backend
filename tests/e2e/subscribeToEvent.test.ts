import { subscribeToEventController } from "../../src/controllers/subscribeToEventController";
import { redis } from "../../src/lib/redis";
import { db } from "../../src/lib/prisma";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/prisma", () => ({
  db: {
    subscription: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));
jest.mock("../../src/lib/redis", () => ({
  redis: { zincrby: jest.fn() }
}));

describe("E2E - subscribeToEvent", () => {
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

  it("should subscriber user to event without increment rank", async () => {
    const req = { body: { name: "Fulano", email: "fulano@email.com" } } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (db.subscription.findUnique as jest.Mock).mockResolvedValue(null);
    (db.subscription.create as jest.Mock).mockResolvedValue({
      id: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbd",
      name: "Fulano",
      email: "fulano@email.com"
    });
    await subscribeToEventController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbd" });
    expect(redis.zincrby).not.toHaveBeenCalled()
  });

  it("should subscriber user to event with increment rank", async () => {
    const req = {
      body: {
        name: "Fulano",
        email: "fulano@email.com",
        referrer: "7405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
      }
    } as unknown as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (db.subscription.findUnique as jest.Mock).mockResolvedValue(null);
    (db.subscription.create as jest.Mock).mockResolvedValue({
      id: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbd",
      name: "Fulano",
      email: "fulano@email.com",
    });
    await subscribeToEventController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ subscriberId: "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbd" });
    expect(redis.zincrby).toHaveBeenCalledWith(
      "referral:ranking",
      1,
      "7405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
  });
});
