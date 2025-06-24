import express from "express"
import {getPlayersRatings, setPlayersRatings} from "../controllers/ratingRouter.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const ratingRouter = express.Router()

ratingRouter.get("/", getPlayersRatings)
ratingRouter.post("/", setPlayersRatings)


export{ratingRouter}