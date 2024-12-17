import { env } from "@/configs"
import redisClient from "@/configs/redis.config"
import { IUser } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError, exclude, generateToken, verifyToken } from "@/utils"
import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken"

const login = async (data: Pick<IUser, "email" | "password">) => {
  const { email, password } = data

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  })

  if (!user) {
    throw new CustomError(400, "User not found")
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new CustomError(400, "Email/Password incorrect")
  }

  const accessToken = generateToken("token", user.id)
  const refreshToken = generateToken("refreshToken", user.id)

  await redisClient.set(`auth:${user.id}:refreshToken`, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days
  })
  await redisClient.set(`auth:${user.id}:accessToken`, accessToken, {
    EX: 15 * 60, // 15 minutes
  })

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken,
    },
  })

  return {
    user: exclude(user, ["password"]),
    accessToken,
    refreshToken,
  }
}

const register = async (data: Omit<IUser, "id" | "refreshToken">) => {
  const { email, name, password, role } = data

  const isEmailExist = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (isEmailExist) {
    throw new CustomError(409, "Email already exists")
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await bcrypt.hash(password, 10),
      role,
    },
  })

  return {
    user: exclude(user, ["password"]),
  }
}

const refreshToken = async (data: Pick<IUser, "refreshToken">) => {
  const { refreshToken } = data

  if (!refreshToken) {
    throw new CustomError(404, "User not found")
  }

  const decodedToken = verifyToken(refreshToken, env.APP.JWT_REFRESH_SECRET) as JwtPayload

  const storedRefreshToken = await redisClient.get(`auth:${decodedToken.userId}:refreshToken`)
  if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
    throw new CustomError(401, "Invalid refresh token")
  }

  const newAccessToken = generateToken("token", decodedToken.userId)

  return {
    accessToken: newAccessToken,
  }
}

const SAuth = {
  login,
  register,
  refreshToken,
}

export default SAuth
