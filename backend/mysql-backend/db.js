// what do you mean by "migration" in Handle table creation and migrations manually or via SQL scripts.
import mysql2 from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

export const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // port: process.env.DB_PORT || 3306
})

