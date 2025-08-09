import { z } from "zod";

export const accessInviteLinkSchema = z.object({
  subscriberId: z.string().uuid()
})
export type AccessInviteLinkSchema = z.infer<typeof accessInviteLinkSchema>

export const getSubscriberInvitesClicksSchema = z.object({
  subscriberId: z.string().uuid()
})
export type GetSubscriberInvitesClicksSchema = z.infer<typeof getSubscriberInvitesClicksSchema>

export const getSubscriberInvitesCountSchema = z.object({
  subscriberId: z.string().uuid()
})
export type GetSubscriberInvitesCountSchema = z.infer<typeof getSubscriberInvitesCountSchema>

export const getSubscriberRankingPositionSchema = z.object({
  subscriberId: z.string().uuid()
})
export type GetSubscriberRankingPositionSchema = z.infer<typeof getSubscriberRankingPositionSchema>

export const subscribeToEventSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrer: z.string().nullish(),
})
export type SubscribeToEventSchema = z.infer<typeof subscribeToEventSchema>
