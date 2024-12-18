import { ITasks } from "@/interfaces"
import prisma from "@/prisma/clients/core.client"
import { CustomError } from "@/utils"

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany()

  if (!tasks) {
    throw new CustomError(400, "Task not found")
  }

  return {
    tasks: tasks,
  }
}

const getTaskById = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  })

  if (!task) {
    throw new CustomError(400, "Task not found")
  }

  return {
    task,
  }
}

const createTask = async (data: Omit<ITasks, "id">) => {
  const { title, description, status, dueDate, projectId, assigneeId } = data
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate,
      assignee: {
        connect: { id: assigneeId },
      },
      project: {
        connect: { id: projectId },
      },
    },
    include: {
      assignee: true,
      project: true,
    },
  })

  return {
    task,
  }
}

const updateTask = async (id: string, data: Omit<ITasks, "id">) => {
  const { title, description, status, dueDate, projectId, assigneeId } = data

  const updatedTask = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      status,
      dueDate,
      assignee: {
        connect: { id: assigneeId },
      },
      project: {
        connect: { id: projectId },
      },
    },
    include: {
      assignee: true,
      project: true,
    },
  })

  return {
    updatedTask,
  }
}

const deleteTask = async (id: string) => {
  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  })

  return {
    deletedTask,
  }
}

const getTaskByProject = async (projectId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      assignee: true,
      project: true,
    },
  })

  return {
    tasks,
  }
}

const STask = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskByProject,
}

export default STask
