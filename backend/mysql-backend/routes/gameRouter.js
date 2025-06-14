import express from "express"

import {getAllGames, getGameById, addGame} from "../controllers/gameController.js"
import { authenticateToken } from "../controllers/userController.js"

const gameRouter = express.Router()

gameRouter.get("/", getAllGames)
gameRouter.get("/:id", getGameById)
gameRouter.post("/", authenticateToken, addGame)


export {gameRouter}