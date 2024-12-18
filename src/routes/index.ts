import { Router } from "express"
import authRouter from "@/routes/auth.routes"
import userRouter from "@/routes/user.routes"
import projectRouter from "@/routes/project.routes"
import taskRouter from "@/routes/task.routes"
import authMiddleware from "@/middlewares/auth.middleware"

const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/project", projectRouter)
router.use("/task", taskRouter)

export default router
