import express from "express"

import {getLastGameGoals,   getAllTimeGoals,   getAvgGameGoals, 
        getLastGameRatings, getAllTimeRatings,
                            getAllTimeWins,    getAvgGameWins } from "../controllers/statsController.js"


const statsRouter = express.Router()



statsRouter.get("/lastgame/goals", getLastGameGoals)
statsRouter.get("/alltime/goals", getAllTimeGoals)
statsRouter.get("/avggame/goals", getAvgGameGoals)

statsRouter.get("/lastgame/ratings", getLastGameRatings)
statsRouter.get("/alltime/ratings",  getAllTimeRatings)


statsRouter.get("/alltime/wins",  getAllTimeWins)
statsRouter.get("/avggame/wins",  getAvgGameWins)



export {statsRouter}