import { db } from "../lib/prisma"
import { redis } from "../lib/redis"

interface SubscribeToEventParams {
  name: string
  email: string
  invitedBySubscriberId: string | null
}

export const subscribeToEvent = async ({ email, invitedBySubscriberId, name }: SubscribeToEventParams) => {
  const subscriber = await db.subscription.findUnique({
    where: {
      email
    }
  })
  if (!subscriber) {
    const subscriberCreated = await db.subscription.create({
      data: {
        name,
        email,
      }
    })
    if (invitedBySubscriberId) {
      await redis.zincrby("referral:ranking", 1, invitedBySubscriberId)
    }
    return { subscriberId: subscriberCreated.id }
  }
  return { subscriberId: subscriber.id }
}