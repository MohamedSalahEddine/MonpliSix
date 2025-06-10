import express from "express"
import { db } from "../db.js"
import { register, login, getAllUsers, getSpittingUsers,  getUser } from "../controllers/userController.js"

const  userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/spittingUsers/:id", getSpittingUsers)
userRouter.get("/:id", getUser)
userRouter.post("/", register)



export {userRouter}



// curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"username":"messiiiazfoeoo","password":"leocom","invited_by
// ":"2"}'