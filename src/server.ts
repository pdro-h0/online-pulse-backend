import express from "express"
import cors from "cors"
import { env } from "./env";
import { router } from "./route";
import { errorHandler } from "./middleware/error-handler";

const app = express()
app.use(cors({
  origin: "*"
}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})
