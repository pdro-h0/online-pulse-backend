import { db } from "../lib/prisma"
import { redis } from "../lib/redis"

export const getRanking = async () => {
  const threeBest = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES")
  const ranking: Record<string, number> = {}
  for (let i = 0; i < threeBest.length; i += 2) {
    ranking[threeBest[i]] = Number(threeBest[i + 1])
  }
  const subscribersFromRanking = await db.subscription.findMany({
    where: {
      id: {
        in: Object.keys(ranking)
      }
    }
  })
  const rankingWithScores = subscribersFromRanking.map((subscriber) => ({
    ...subscriber,
    score: ranking[subscriber.id]
  })).sort((a, b) => b.score - a.score)
  return { rankingWithScores }
}