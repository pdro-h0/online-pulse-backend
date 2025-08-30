import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis"

jest.mock("../../src/lib/redis", () => ({
  redis: { zscore: jest.fn() }
}));

describe("E2E - GET SEUBSCRIBER RANK", () => {
  const subscriberId = "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
  it("should return the invites count", async () => {
    (redis.zscore as jest.Mock).mockResolvedValue(1)
    const res = await request(app).get(`/subscribers/${subscriberId}/ranking/count`).expect(200)
    expect(redis.zscore).toHaveBeenCalledWith(
      "referral:ranking",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.body).toEqual({ count: 1 })
  })
})