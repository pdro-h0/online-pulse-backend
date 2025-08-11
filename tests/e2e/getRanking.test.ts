import { getRankingController } from "../../src/controllers/getRankingController";
import { db } from "../../src/lib/prisma";
import { redis } from "../../src/lib/redis";
import { Request, Response, NextFunction } from "express";

jest.mock("../../src/lib/prisma", () => ({
  db: { subscription: { findMany: jest.fn() } }
}));
jest.mock("../../src/lib/redis", () => ({
  redis: { zrange: jest.fn() }
}));

describe("E2E - getRanking", () => {
  const mockRes = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should respond status 200 with JSON ranking", async () => {
    const req = {} as Request;
    const next = {} as NextFunction;
    const res = mockRes();
    (redis.zrange as jest.Mock).mockResolvedValue([
      "1", "70",
      "2", "80",
      "3", "60",

    ]);
    (db.subscription.findMany as jest.Mock).mockResolvedValue([
      { id: "1", name: "Fulano" },
      { id: "2", name: "Sicrano" },
      { id: "3", name: "Beltrano" },
    ]);
    await getRankingController(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "2", name: "Sicrano", score: 80 },
      { id: "1", name: "Fulano", score: 70 },
      { id: "3", name: "Beltrano", score: 60 },
    ]);
  });
});
