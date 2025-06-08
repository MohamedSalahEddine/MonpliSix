import express from "express"
import { db } from "./db.js"
import  jwt  from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

import { userRouter } from "./routes/userRouter.js"
import { playerRouter } from "./routes/playerRouter.js"

const app = express()
app.use(express.json())

app.use(cors())

app.use("/users", userRouter)
app.use("/players", playerRouter)

// db.query(`INSERT INTO player (id, name, img, foot, pos, rating, status)
//           VALUES (NULL, 'anis', 'camera-solid.svg', 'right', 'fr', '5', 'perm')`)

app.listen(3001, ()=> console.log("app backend running on port 3001"))