import express from "express"
import {db} from "../db.js"


const getAllGames = async (req, res)=>{
    
}


const getGameById = async (req, res)=>{

}


const addGame = async (req, res)=>{
    try {

       
        const {id:created_by} = req.user
        const sql0 = `INSERT INTO game (created_by, created_at) values (?, NOW())`
        const [response0] = await db.query(sql0, [created_by])
        const last_inserted_game = response0.insertId 

        const sql1 = `INSERT INTO teams (game_id) VALUES (?), (?)`
        const [response1] = await db.query(sql1, [(last_inserted_game), (last_inserted_game)])
        const last_inserted_team = response1.insertId
        
                
        const { playersTeamA, playersTeamB } = req.body;
        const teamAValues = playersTeamA.map(id => [last_inserted_team, id])
        const teamBValues = playersTeamB.map(id => [last_inserted_team+1, id])
        
        const sql2 = `INSERT INTO team_players (team_id, player_id) VALUES ?`
        await db.query(sql2, [teamAValues])
        await db.query(sql2, [teamBValues])

        res.status(200).json({ message: "Players inserted successfully" })
    } catch (error) {
        console.error("error: " + error)
        res.status(500).json({ message: "A problem has occurred on the server" })
    }
}

export {getAllGames, getGameById, addGame}