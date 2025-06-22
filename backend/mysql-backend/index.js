import express from "express"
import { db } from "./db.js"
import  jwt  from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

import { userRouter } from "./routes/userRouter.js"
import { playerRouter } from "./routes/playerRouter.js"
import { spittingItemsRouter } from "./routes/spittingItemsRouter.js"
import { gameRouter } from "./routes/gameRouter.js"
import { statsRouter } from "./routes/statsRouter.js"

const app = express()
app.use(express.json())

app.use(cors())

app.use("/users", userRouter)
app.use("/players", playerRouter)
app.use("/games", gameRouter)
app.use("/stats", statsRouter)
app.use("/spittingItems", spittingItemsRouter)



// app.listen(3001, ()=> console.log("app backend running on port 3001"))
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
