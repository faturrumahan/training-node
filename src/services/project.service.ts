import { IProjects } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"

const getAllProjects = async () => {
  const projects = await prisma.project.findMany()

  if (!projects) {
    throw new CustomError(400, "Project not found")
  }

  return {
    project: projects,
  }
}

const getProjectById = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      tasks: {
        include: {
          assignee: {
            select: {
              id: true, 
              name: true,
              email: true,
            },
          }
        },
      },
      userProjects: {
        include: {
          user: {
            select: {
              id: true, 
              name: true,
              email: true,
            },
          }
        },
      },
      owner: {
        select: {
          id: true, 
          name: true,
          email: true,
        },
      }
    },
  })

  if (!project) {
    throw new CustomError(400, "Project not found")
  }

  return {
    project,
  }
}

const createProject = async (data: Omit<IProjects, "id">) => {
  const { title, description, status, deadline, ownerId } = data
  const project = await prisma.project.create({
    data: {
      title,
      description,
      status,
      deadline,
      owner: {
        connect: { id: ownerId },
      },
    },
    include: { owner: true },
  })

  return {
    project,
  }
}

const updateProject = async (id: string, data: Omit<IProjects, "id">) => {
  const { title, description, status, deadline } = data

  const updatedProject = await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      status,
      deadline,
    },
    include: {
      owner: true,
    },
  })

  return {
    updatedProject,
  }
}

const deleteProject = async (id: string) => {
  const deletedProject = await prisma.project.delete({
    where: {
      id,
    },
  })

  return {
    deletedProject,
  }
}

const addUserToProject = async (projectId: string, userId: string) => {
  const userProject = await prisma.userProject.create({
    data: {
      user: {
        connect: { id: userId },
      },
      project: {
        connect: { id: projectId },
      },
    },
    include: {
      user: true,
      project: true,
    },
  })

  return {
    userProject,
  }
}

const deleteUserFromProject = async (id: string) => {
  const deletedUser = await prisma.userProject.delete({
    where: {
      id,
    },
  })

  return {
    deletedUser,
  }
}

const SProject = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
  deleteUserFromProject,
}

export default SProject
