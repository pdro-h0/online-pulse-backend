import { RequestHandler } from "express";
import { getRanking } from "../functions/getRanking";

export const getRankingController: RequestHandler = async (req, res) => {
  const { rankingWithScores } = await getRanking()
  res.status(200).json(rankingWithScores)
}