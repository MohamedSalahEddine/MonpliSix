import express from "express"

import {getAllGames, getGameById, addGame, score, getGamesHistory} from "../controllers/gameController.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const gameRouter = express.Router()

gameRouter.get("/", getAllGames)
gameRouter.get("/score/:id", score)

gameRouter.get("/gamesHistory/:id", getGamesHistory)
gameRouter.get("/:id", getGameById)
gameRouter.post("/", addGame)


export {gameRouter}