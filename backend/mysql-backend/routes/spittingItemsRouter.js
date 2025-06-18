import express from "express"

import {getAllSpittingItems, getSpittingItem, addSpittingItem} from "../controllers/spittingItemController.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const spittingItemsRouter = express.Router()




spittingItemsRouter.get("/",    getAllSpittingItems)
spittingItemsRouter.get("/:id", getSpittingItem )
spittingItemsRouter.post("/",   addSpittingItem)



export {spittingItemsRouter}