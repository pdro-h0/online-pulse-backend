import { RequestHandler } from "express";
import { getSubscriberInvitesClicksSchema } from "../schemas/subscriberSchema";
import { getSubscriberInvitesClicks } from "../functions/getSubscriberInvitesClick";

export const getSubscriberInvitesClicksClickController: RequestHandler = async (req, res) => {
  const { subscriberId } = getSubscriberInvitesClicksSchema.parse(req.params)
  const { count } = await getSubscriberInvitesClicks({ subscriberId })
  res.status(200).json({ count })
}