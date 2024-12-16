import { IUser } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError, exclude, generateToken } from "@/utils"
import bcrypt from "bcrypt"

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

  return {
    user: exclude(user, ["password"]),
    accessToken,
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
    throw new CustomError(400, "Email already exists")
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

const SAuth = {
  login,
  register,
}

export default SAuth
