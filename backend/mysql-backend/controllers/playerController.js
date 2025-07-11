import express from "express"
import { db } from "../db.js"
import jwt from "jsonwebtoken"

const getAllPlayers = async (req, res)=>{
    
    try{
        const [players] = await db.query(  `SELECT DISTINCT users.*, players.*, game.created_at
                                            FROM users INNER JOIN players ON users.player_id = players.id
                                            LEFT JOIN team_players ON players.id = team_players.player_id
                                            LEFT JOIN teams ON team_players.team_id = teams.id
                                            LEFT JOIN game ON teams.game_id = game.id
                                            ORDER BY game.created_at DESC, players.pos, players.rating DESC`)
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


const getProfile = async (req, res) => {
    try{
        const {id} = req.params
        const [profile] = await db.query(`SELECT users.img, players.id ,players.name, players.rating, COUNT( goals.id ) as nbr_goals
                                    FROM users INNER JOIN players ON users.player_id = players.id LEFT JOIN goals ON players.id = goals.player_id
                                    WHERE users.id = ?
                                    GROUP BY users.img, players.id, players.name, players.rating;`, [id])   
        if(!profile) return res.status(404).json({message : "no profile found :/"})
       
        return res.status(200).json({profile : profile[0]})
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "problem retriving a profile"})
        
    }
}


export {getAllPlayers,  getPlayer, addPlayer, getProfile}