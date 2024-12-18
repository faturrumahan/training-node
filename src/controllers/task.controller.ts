import STask from "@/services/task.service"
import { formatResponse } from "@/utils"
import { NextFunction, Request, Response } from "express"

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await STask.getAllTasks()
    res.json(formatResponse("T", "Get All Task Success", tasks))
  } catch (error) {
    next(error)
  }
}

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const task = await STask.getTaskById(id)
    res.json(formatResponse("T", "Get Task Success", task))
  } catch (error) {
    next(error)
  }
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await STask.createTask(req.body)
    res.json(formatResponse("T", "Create Task Success", task))
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updatedTask = await STask.updateTask(id, req.body)
    res.json(formatResponse("T", "Update Task Success", updatedTask))
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await STask.deleteTask(id)
    res.json(formatResponse("T", "Delete Task Success"))
  } catch (error) {
    next(error)
  }
}

const getTaskByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params
    const tasks = await STask.getTaskByProject(projectId)
    res.json(formatResponse("T", "Get Task Success", tasks))
  } catch (error) {
    next(error)
  }
}

const CTask = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskByProject,
}

export default CTask
