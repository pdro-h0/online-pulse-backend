import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis"

jest.mock("../../src/lib/redis", () => ({
  redis: { zincrby: jest.fn() }
}))

describe("E2E - subscribeToEvent", () => {
  it("should subscribe user without incrementing rank", async () => {
    const res = await request(app)
      .post(`/subscriptions`)
      .send({ name: "Fulano", email: "fulano@email.com" })
      .expect(201)

    expect(res.body).toHaveProperty("subscriberId")
    expect(redis.zincrby).not.toHaveBeenCalled()
  }, 99000)

  it("should subscribe user with incrementing rank", async () => {
    const referrerId = "7405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
    const res = await request(app)
      .post(`/subscriptions`)
      .send({
        name: "Beltrano",
        email: "beltrano@email.com",
        referrer: referrerId,
      })
      .expect(201)
    expect(res.body).toHaveProperty("subscriberId")
    expect(redis.zincrby).toHaveBeenCalledWith(
      "referral:ranking",
      1,
      referrerId
    )
  }, 99000)
})

