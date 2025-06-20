import express from "express"
import bcrypt from "bcryptjs"
import {db} from "../db.js"
import jwt from "jsonwebtoken"

const register = async (req, res)=>{
    const {username, password, invited_by} = req.body
    const hashed = await bcrypt.hash(password, 10)
    const sql = `INSERT INTO users ( username, password, invited_by) VALUES (' ${username}','${hashed}',${invited_by} )`
    
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
    const {username, password } = req.body
    console.log("hheyy", username);
    
    try{
        const [users] = await db.query(`SELECT * FROM users WHERE username = ?`, [username])
        const user = users[0]
        if(!user) return res.status(404).json({message : "user not found :/"})

        const [permissions] = await db.query(`  SELECT p.name
                                                FROM users u
                                                JOIN roles r ON u.role_id = r.id
                                                JOIN role_permissions rp ON r.id = rp.role_id
                                                JOIN permissions p ON rp.permission_id = p.id
                                                WHERE u.id = ?`, [user.id])
        
        if(!permissions) return res.status(404).json({message : "permissions not found :/"})
        const permissions_list = permissions.map(permission => permission.name);
     
        if(user.password !== password) return res.status(404).json({message : "wrong password"})
        
        const token = jwt.sign(
            {id : user.id, username : user.username, permissions : permissions_list},
            process.env.JWT_SECRET,
            {expiresIn : "10h"}
        )
        
        return res.status(200).json({token})
        
    }catch(error){
        console.error("error : "+error)
        res.status(500).json({message : "problem from server "})
    }
    
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
    const {id} = req.params     
    try{
        const [players] = await db.query(`SELECT users.id, users.username as name,  users.img ,  spitting_item_user.date_paid
                                            FROM users INNER JOIN spitting_item_user on users.id = spitting_item_user.user_id 
                                            && spitting_item_user.spitting_item_id = ?`, [id])
        if(players.length < 1) return res.status(400).json({message : "no spitting users found"})
        return  res.status(200).json(players)
    }catch(error){
        console.error(error)
    }
}

const getUser = async (req, res)=>{
    const id = req.params.id
    try{
        const sql = `select * from users where id=?`
        const [user] = await db.query(sql, [id])        
        res.json(user)
        
    }catch(error){
        console.error(`error fetching user`, error.message)
        console.error(error)
        res.status(500).json({error : "a problem with the server occured :/"})
    }
    
}


const markAsPaid = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        // Update the date_paid for this user-item combination
        const result = await db.query(
            'UPDATE spitting_item_user SET date_paid = NOW() WHERE user_id = ? AND spitting_item_id = ?',
            [userId, itemId]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const markAsUnpaid =  async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        // Set date_paid to NULL for this user-item combination
        const result = await db.query(
            'UPDATE spitting_item_user SET date_paid = NULL WHERE user_id = ? AND spitting_item_id = ?',
            [userId, itemId]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




export { register, login, getAllUsers, getSpittingUsers,  getUser, markAsPaid, markAsUnpaid }