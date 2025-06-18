import express from "express"
import { db } from "../db.js"
import { register, login, getAllUsers, getSpittingUsers,  getUser, markAsPaid, markAsUnpaid } from "../controllers/userController.js"

import {authenticateToken} from "../middleware/authenticateToken.js"
import {hasPermission} from "../middleware/hasPermission.js"

const  userRouter = express.Router()

userRouter.get("/", authenticateToken,  getAllUsers)
userRouter.get("/spittingUsers/:id", getSpittingUsers)

userRouter.put('/markPaid/:userId/:itemId',authenticateToken, hasPermission("manage_spitting"), markAsPaid);
userRouter.put('/markUnpaid/:userId/:itemId',authenticateToken, hasPermission("manage_spitting"), markAsUnpaid);

userRouter.get("/:id", getUser)
userRouter.post("/", login)
userRouter.post("/newUser", register)




export {userRouter}



// curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"username":"messiiiazfoeoo","password":"leocom","invited_by
// ":"2"}'