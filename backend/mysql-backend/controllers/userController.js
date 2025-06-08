import express from "express"
// import mysql2 from "mysql2"
import bcrypt from "bcryptjs"
import {db} from "../db.js"


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

export {login, register, getAllUsers, getUser}