import { redis } from '../lib/redis'

interface GetSubscriberInvitesClicksParams {
  subscriberId: string
}

export const getSubscriberInvitesClicks = async ({
  subscriberId,
}: GetSubscriberInvitesClicksParams) => {
  const accessCount = await redis.hget('referral:access-count', subscriberId)

  return { count: accessCount ? Number.parseInt(accessCount) : 0 }
}