import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  if (!users) {
    throw new CustomError(400, "User not found")
  }

  return {
    user: users,
  }
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  if (!user) {
    throw new CustomError(400, "User not found")
  }

  return {
    user,
  }
}

const SUser = {
  getAllUsers,
  getUserById,
}

export default SUser