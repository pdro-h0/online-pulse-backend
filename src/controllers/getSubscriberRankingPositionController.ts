import { RequestHandler } from "express";
import { getSubscriberRankingPositionSchema } from "../schemas/subscriberSchema";
import { getReankPosition } from "../functions/getRankingPosition";

export const getSubscriberRankingPositionController: RequestHandler = async (req, res) => {
  const { subscriberId } = getSubscriberRankingPositionSchema.parse(req.params)
  const { position } = await getReankPosition({ subscriberId })
  res.status(200).json({ position })
} 