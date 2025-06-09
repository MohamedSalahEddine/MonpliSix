import express from "express"
// import mysql2 from "mysql2"
import bcrypt from "bcryptjs"
import {db} from "../db.js"




const register = async (req, res)=>{
    const {username, password, invited_by} = req.body
    const hashed = await bcrypt.hash(password, 10)
    const sql = `INSERT INTO users ( username, password, invited_by) VALUES (' ${username}','${hashed}',${invited_by} )`
    console.log(username);
    
    try{
        const [existing] = await db.query("SELECT * FROM `USER` where username = ?", [username])
        if(existing.length > 0) return res.status(400).json({error : "user already exists"})
        
        await db.query(sql, [username])
        return res.status(201).json({message : `user ${username} created`})
        
    }catch(error){
        console.log(error);
        res.status(500).json({error : "database error :/"})
    }
}


const login = async (req, res)=>{

}

const getAllUsers = async (req, res)=>{
   
   try{
        const sql = `select * from users`
        const [users] = await db.query(sql)
        res.json(users)
        
    }catch(error){
        console.error(`error fetching users`, error)
        res.status(500).json({error : "a problem with the server occured :/"})
    }
    
}

const getSpittingUsers = async (req, res)=>{
    try{
        const [players] = await db.query(`SELECT users.id, users.username as name,  users.img ,  spitting_item_user.date_paid
                                            FROM users INNER JOIN spitting_item_user on users.id = spitting_item_user.user_id 
                                            && spitting_item_user.spitting_item_id = 1`)
        // const [players] = await db.query(`SELECT users.id, users.username as name,  users.img  
        //                                     FROM users INNER JOIN roles ON users.role_id = roles.id 
        //                                     INNER JOIN role_permissions ON roles.id = role_permissions.role_id 
        //                                     INNER JOIN permissions ON permissions.id = role_permissions.permission_id
        //                                     WHERE permissions.name = "spit"`)
        if(players.length < 1) return res.status(400).json({message : "no spitting users found"})
        return  res.status(200).json(players)
    }catch(error){
        console.error(error)
        
    }

}

const getUser = async (req, res)=>{
    const id = req.params.id
    try{
        const sql = `select * from user where id=?`
        const [user] = await db.query(sql, [id])
        // console.log(user);
        res.json(user)
        
    }catch(error){
        console.error(`error fetching user`, error)
        res.status(500).json({error : "a problem with the server occured :/"})
    }
    
}

export { register, login, getAllUsers, getSpittingUsers,  getUser}