import { redis } from "../lib/redis"

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export const getSubsciberInvitesCount = async ({ subscriberId }: GetSubscriberInvitesCountParams) => {
  const invites = await redis.zscore("referral:ranking", subscriberId)
  return {
    count: invites ? Number.parseInt(invites) : 0
  }
}
