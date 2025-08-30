import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis"
import { db } from "../../src/lib/prisma";

jest.mock("../../src/lib/redis", () => ({
  redis: { zrevrange: jest.fn() }
}));
jest.mock("../../src/lib/prisma", () => ({
  db: { subscription: { findMany: jest.fn() } }
}));

describe("E2E - getRanking", () => {
  it("should respond status 200 with JSON ranking", async () => {
    (redis.zrevrange as jest.Mock).mockResolvedValue([
      "1", "70",
      "2", "80",
      "3", "60",
    ]);
    (db.subscription.findMany as jest.Mock).mockResolvedValue([
      { id: "1", name: "Fulano" },
      { id: "2", name: "Sicrano" },
      { id: "3", name: "Beltrano" },
    ]);
    const res = await request(app).get("/ranking").expect(200)
    expect(res.body).toEqual([
      { id: "2", name: "Sicrano", score: 80 },
      { id: "1", name: "Fulano", score: 70 },
      { id: "3", name: "Beltrano", score: 60 },
    ]
    )
  }, 30000)
})