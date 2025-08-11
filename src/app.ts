import express from "express"
import { router } from "./route";
import { errorHandler } from "./middleware/error-handler";
import cors from "cors"

export const app = express()
app.use(cors({
  origin: "*"
}))
app.use(express.json())
app.use(router)
app.use(errorHandler)