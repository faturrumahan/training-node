import SProject from "@/services/project.service"
import { formatResponse } from "@/utils"
import { NextFunction, Request, Response } from "express"

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await SProject.getAllProjects()
    res.json(formatResponse("T", "Get All Project Success", projects))
  } catch (error) {
    next(error)
  }
}

const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const project = await SProject.getProjectById(id)
    res.json(formatResponse("T", "Get Project Success", project))
  } catch (error) {
    next(error)
  }
}

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await SProject.createProject(req.body)
    res.json(formatResponse("T", "Create Project Success", project))
  } catch (error) {
    next(error)
  }
}

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updatedProject = await SProject.updateProject(id, req.body)
    res.json(formatResponse("T", "Update Project Success", updatedProject))
  } catch (error) {
    next(error)
  }
}

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await SProject.deleteProject(id)
    res.json(formatResponse("T", "Delete Project Success"))
  } catch (error) {
    next(error)
  }
}

const addUserToProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, userId } = req.body
    await SProject.addUserToProject(projectId, userId)
    res.json(formatResponse("T", "Add User to Project Success"))
  } catch (error) {
    next(error)
  }
}

const deleteUserFromProject = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  try {
    const { id } = req.body
    await SProject.deleteUserFromProject(id)
    res.json(formatResponse("T", "Delete User from Project Success"))
  } catch (error) {
    next(error)
  }
}

const CProject = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
  deleteUserFromProject,
}

export default CProject
