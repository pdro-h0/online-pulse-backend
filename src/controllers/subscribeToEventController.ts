import { RequestHandler } from "express";
import { subscribeToEventSchema } from "../schemas/subscriberSchema";
import { subscribeToEvent } from "../functions/subscribeToEvent";

export const subscribeToEventController: RequestHandler = async (req, res) => {
  const { name, email, referrer } = subscribeToEventSchema.parse(req.body)
  const { subscriberId } = await subscribeToEvent({ name, email, invitedBySubscriberId: referrer || null })
  res.status(201).json({ subscriberId })
} 