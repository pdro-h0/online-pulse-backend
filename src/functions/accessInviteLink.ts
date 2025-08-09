import { redis } from '../lib/redis'

interface AccessInviteLinkParams {
  subscriberId: string
}

export const accessInviteLink = async ({
  subscriberId,
}: AccessInviteLinkParams) => {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}