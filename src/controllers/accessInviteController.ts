import { RequestHandler } from "express";
import { accessInviteLinkSchema } from "../schemas/subscriberSchema";
import { accessInviteLink } from "../functions/accessInviteLink";
import { env } from "../env";

export const accessInviteController: RequestHandler = async (req, res) => {
  const { subscriberId } = accessInviteLinkSchema.parse(req.params)
  await accessInviteLink({ subscriberId })
  const redirectURL = new URL(env.WEB_URL)
  redirectURL.searchParams.set("referrer", subscriberId)
  res.status(302).redirect(redirectURL.toString())
  return;
}