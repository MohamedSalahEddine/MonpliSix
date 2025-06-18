import express from "express"

import { getAllPlayers,  getPlayer, addPlayer, getProfile  } from "../controllers/playerController.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const playerRouter = express.Router()


playerRouter.get("/" , authenticateToken, getAllPlayers)
playerRouter.get("/profile/:id" , getProfile)
playerRouter.get("/:id" , getPlayer)
playerRouter.post("/" , addPlayer)

export {playerRouter}