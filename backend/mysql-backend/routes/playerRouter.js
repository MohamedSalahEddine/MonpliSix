import express from "express"

import { getAllPlayers,  getPlayer, addPlayer  } from "../controllers/playerController.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const playerRouter = express.Router()


playerRouter.get("/" , authenticateToken, getAllPlayers)
playerRouter.get("/:id" , getPlayer)
playerRouter.post("/" , addPlayer)

export {playerRouter}