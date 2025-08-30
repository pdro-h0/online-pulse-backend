import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis"

jest.mock("../../src/lib/redis", () => ({
  redis: { hget: jest.fn() }
}));

describe("E2E - GET SUBSCRIBER INVITES CLICK", () => {
  const subscriberId = "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
  it("should return the amount of invites clicks ", async () => {
    (redis.hget as jest.Mock).mockResolvedValue(1)
    const res = await request(app).get(`/subscribers/${subscriberId}/ranking/clicks`).expect(200)
    expect(redis.hget).toHaveBeenCalledWith(
      "referral:access-count",
      "8405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
    )
    expect(res.body).toEqual({ count: 1 })
  })
})