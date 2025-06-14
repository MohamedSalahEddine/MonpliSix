import express from "express"

import {getAllGames, getGameById, addGame} from "../controllers/gameController.js"

const gameRouter = express.Router()

gameRouter.get("/", getAllGames)
gameRouter.get("/:id", getGameById)
gameRouter.post("/", addGame)


export {gameRouter}