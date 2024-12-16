import CUser from "@/controllers/user.controller"
import { Router } from "express"

const router = Router()

router.get("/", CUser.getAllUsers)
router.get("/:id", CUser.getUserById)

export default router
