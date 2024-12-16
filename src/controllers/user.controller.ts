import SUser from "@/services/user.service"
import { formatResponse } from "@/utils"
import { NextFunction, Request, Response } from "express"

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await SUser.getAllUsers()
    res.json(formatResponse("T", "Get All User Success", users))
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const users = await SUser.getUserById(id)
    res.json(formatResponse("T", "Get User Success", users))
  } catch (error) {
    next(error)
  }
}

const CUser = {
  getAllUsers,
  getUserById,
}

export default CUser
