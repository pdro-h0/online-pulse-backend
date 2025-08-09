import { RequestHandler } from "express";
import { getSubscriberInvitesCountSchema } from "../schemas/subscriberSchema";
import { getSubsciberInvitesCount } from "../functions/getSubsciberInvitesCount";

export const getSubscriberInvitesCountController: RequestHandler = async (req, res) => {
  const { subscriberId } = getSubscriberInvitesCountSchema.parse(req.params)
  const { count } = await getSubsciberInvitesCount({ subscriberId })
  res.status(200).json({ count })
}