import { redis } from "../lib/redis"

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export const getReankPosition = async ({ subscriberId }: GetSubscriberRankingPositionParams) => {
  const position = await redis.zrevrank("referral:ranking", subscriberId)
  if (position === null) return { position: null }
  return {
    position: position + 1
  }
}