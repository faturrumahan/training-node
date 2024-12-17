import SAuth from "@/services/auth.service"
import { CustomError, formatResponse } from "@/utils"
import { VLoginSchema, VRegisterSchema } from "@/validators"
import { Request, Response, NextFunction } from "express"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VLoginSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.login(value)
    res.json(formatResponse("T", "Login Success", user))
  } catch (error) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VRegisterSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.register(value)
    res.json(formatResponse("T", "Register Success", user))
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await SAuth.refreshToken(req.body)
    res.json(formatResponse("T", "Refresh Token Success", user))
  } catch (error) {
    next(error)
  }
}

const CAuth = {
  login,
  register,
  refreshToken,
}

export default CAuth
