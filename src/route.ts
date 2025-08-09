import { Router } from "express"
import { subscribeToEventController } from "./controllers/subscribeToEventController"
import { getSubscriberRankingPositionController } from "./controllers/getSubscriberRankingPositionController"
import { getSubscriberInvitesCountController } from "./controllers/getSubscriberInvitesCountController"
import { getSubscriberInvitesClicksClickController } from "./controllers/getSubscriberInvitesClicksController"
import { getRankingController } from "./controllers/getRankingController"
import { accessInviteController } from "./controllers/accessInviteController"

export const router = Router()

router.post("/subscriptions", subscribeToEventController)
router.get("/invites/:subscriberId", accessInviteController)
router.get("/subscribers/:subscriberId/ranking/position", getSubscriberRankingPositionController)
router.get("/subscribers/:subscriberId/ranking/count", getSubscriberInvitesCountController)
router.get("/subscribers/:subscriberId/ranking/clicks", getSubscriberInvitesClicksClickController)
router.get("/ranking", getRankingController)
