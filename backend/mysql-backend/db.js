// what do you mean by "migration" in Handle table creation and migrations manually or via SQL scripts.
import mysql2 from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

export const db = mysql2.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DB_NAME
})

