import express from "express"

import { getAllPlayers,  getPlayer, addPlayer  , authenticateToken} from "../controllers/playerController.js"

const playerRouter = express.Router()


playerRouter.get("/" , getAllPlayers)
playerRouter.get("/:id" , getPlayer)
playerRouter.post("/" , addPlayer)

export {playerRouter}