import express from "express"
import { db } from "../db.js"
import jwt from "jsonwebtoken"

const getAllPlayers = async (req, res)=>{
    // console.log(req.user);
    
    try{
        const [players] = await db.query(`SELECT * FROM players INNER JOIN users on players.id = users.player_id`)
        if(players.length < 1) return res.status(400).json({message : "no players found"})
        return  res.status(200).json(players)
    }catch(error){
        console.error(error)
    }
}



const getPlayer = async (req, res)=>{
    
}

const addPlayer = async (req, res)=>{

}





export {getAllPlayers,  getPlayer, addPlayer}