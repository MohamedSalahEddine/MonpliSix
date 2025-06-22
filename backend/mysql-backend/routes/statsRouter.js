import express from "express"

import {getAllTimeGoals, getLastGameGoals, getAvgGameGoals} from "../controllers/statsController.js"


const statsRouter = express.Router()



statsRouter.get("/alltime/goals", getAllTimeGoals)
statsRouter.get("/lastgame/goals", getLastGameGoals)
statsRouter.get("/avggame/goals", getAvgGameGoals)

export {statsRouter}