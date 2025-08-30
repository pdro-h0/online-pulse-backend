import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis"

jest.mock("../../src/lib/redis", () => ({
  redis: { zrevrank: jest.fn() }
}));

describe("E2E GET RANK POSITION", () => {
  const subscriberId = "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
  it("should get subscriber rank position", async () => {
    (redis.zrevrank as jest.Mock).mockResolvedValue(1)
    const res = await request(app).get(`/subscribers/${subscriberId}/ranking/position`).expect(200)
    expect(redis.zrevrank).toHaveBeenCalledWith(
      "referral:ranking",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.body).toEqual({ position: 2 })
  })
})