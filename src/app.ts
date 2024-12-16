import express from "express"
import logger from "morgan"
import { env } from "@/configs"
import coreRouter from "./routes"
import { errorHandler } from "./middlewares"

const app = express()

app.use(logger("dev"))
app.use(express.json())

app.use("/core", coreRouter)

app.use(errorHandler)

app.listen(env.APP.PORT, () => {
  console.log(`[Server] - Listening on port ${env.APP.PORT}`)
})
