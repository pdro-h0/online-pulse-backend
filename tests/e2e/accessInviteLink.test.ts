import request from "supertest"
import { app } from "../../src/app"
import { redis } from "../../src/lib/redis";

jest.mock("../../src/lib/redis", () => ({
  redis: { hincrby: jest.fn() }
}));

describe("E2E - accessInviteLink", () => {
  it("should redirect with status 302 and referrer on URL", async () => {
    const subscriberId = "7405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc"
    const res = await request(app)
      .get(`/invites/${subscriberId}`).expect(302)
    expect(redis.hincrby).toHaveBeenCalledWith(
      "referral:access-count",
      "7405d0a5-d3b5-4fb4-937f-ec4aa5df4fbc",
      1
    )
    expect(res.redirect).toBeTruthy();
  }, 990000)
})