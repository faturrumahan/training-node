import { NextFunction, Request, Response, Router } from "express"
import authRouter from "@/routes/auth.routes"
import userRouter from "@/routes/user.routes"
import authMiddleware from "@/middlewares/auth.middleware"

const router = Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: true,
    message: "Core Service - Welcome",
    data: null,
  })
})

router.post("/send-back", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: true,
    message: "Core Service - Post",
    data: req.body,
  })
})

router.use("/auth", authRouter)
router.use("/user", authMiddleware, userRouter)

export default router
