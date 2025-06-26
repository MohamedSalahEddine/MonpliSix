import express from "express"

import {getAllGames, getGameById, addGame, score, getGamesHistory, getMVP, endGame} from "../controllers/gameController.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const gameRouter = express.Router()

gameRouter.get("/", getAllGames)
gameRouter.get("/mvp/:id", getMVP)
gameRouter.get("/score/:id", score)

gameRouter.get("/gamesHistory/:id", getGamesHistory)
gameRouter.get("/:id", getGameById)
gameRouter.post("/end_game", authenticateToken,  endGame)
gameRouter.post("/", authenticateToken,  addGame)


export {gameRouter}