import express from "express"
import {db} from "../db.js"


const getAllGames = async (req, res)=>{
    
}


const getGameById = async (req, res)=>{

}


const addGame = async (req, res)=>{
    try {

        // await db.query("delete from game")
       
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








const score = async (req, res) => {
  const { id } = req.params;
  // console.log(id + " scoringg");

  const conn = await db.getConnection(); // get a manual connection for transaction

  try {
    await conn.beginTransaction(); // 🚀 Start transaction

    // 1. Get last team
    const [response1] = await conn.query(
      `SELECT MAX(team_id) as last_team FROM team_players WHERE player_id = ?`,
      [id]
    );
    const [{ last_team }] = response1;

    if (!last_team) {
      await conn.rollback();
      return res.status(400).json({ error: "Player is not in any team yet." });
    }

    // 2. Insert goal
    const [response2] = await conn.query(
      `INSERT INTO goals (id, player_id, date_time, own_goal) VALUES (NULL, ?, NOW(), 0)`,
      [id]
    );
    const last_goal = response2.insertId;

    // 3. Link goal to team
    await conn.query(
      `INSERT INTO team_goals (team_id, goal_id) VALUES (?, ?)`,
      [last_team, last_goal]
    );

    await conn.commit(); // ✅ Everything succeeded

    res.status(200).json({ message: "Goal recorded", goal_id: last_goal });
  } catch (err) {
    console.error("Transaction failed:", err);
    await conn.rollback(); // ❌ Rollback if anything failed
    res.status(500).json({ error: "Failed to record goal" });
  } finally {
    conn.release(); // 🧹 Always release connection
  }
};




















// const score = async (req, res)=>{
    
    // const {id} = req.params
    // console.log(id+" scoringg");
    // // last team is playing for 
    // const sql1 = `SELECT MAX(team_id) as last_team FROM team_players WHERE player_id = ?`
    // const [response1] = await db.query(sql1, [id])
    // const [{last_team}] = response1    

    // if (!last_team) {
    //     return res.status(400).json({ error: "Player is not in any team yet." });
    // }


    // const sql2 = `INSERT INTO goals (id, player_id, date_time, own_goal) VALUES (NULL, ?, NOW(), 0)`
    // const [response2] = await db.query(sql2, [id])
    // const last_goal = response2.insertId
    
    // const sql3 = `INSERT INTO team_goals (team_id, goal_id) values (?, ?)`
    // const [response3] = await db.query(sql3, [last_team, last_goal])
    
    
// }


const getGamesHistory = async (req, res) => {
  
  // let {id} = req.params
  // id = parseInt(id, 10)
  // console.log(typeof id);
  
  try{
    // const sql = ` SELECT g.id AS game_id, g.created_at AS date, tp.team_id, 
    //               SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END) AS team_score, 

    //               SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) AS opponent_score, 

    //               CONCAT( SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END), 
    //               ' - ', SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) ) AS score_display 
    //               FROM team_players tp JOIN teams t ON tp.team_id = t.id JOIN game g ON t.game_id = g.id LEFT JOIN team_goals tg ON tg.team_id IN 
    //               ( SELECT id FROM teams WHERE game_id = g.id )
    //               WHERE tp.player_id = ? GROUP BY g.id, g.created_at, tp.team_id 
    //               ORDER BY g.created_at DESC`

  
    // const [response] = await db.query(sql, [ id])
    // console.log(response);
    // return res.status(200).json(response)

    let { id } = req.params;
id = parseInt(id, 10); // Ensures it's a real number
console.log('id from req.params:', id, typeof id);


const sql = ` SELECT  g.id                                                      AS game_id, 
                      g.created_at                                              AS date, 
                      g.start_datetime                                          AS start, 
                      g.end_datetime                                            AS end, 
              SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END)          AS team_score, 
              SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END)         AS opponent_score, 
              CONCAT( SUM(CASE WHEN tg.team_id = tp.team_id THEN 1 ELSE 0 END), 
              ' - ', SUM(CASE WHEN tg.team_id != tp.team_id THEN 1 ELSE 0 END) ) AS score_display 
              FROM team_players tp 
              JOIN teams t ON tp.team_id = t.id 
              JOIN game g ON t.game_id = g.id 
              LEFT JOIN team_goals tg ON tg.team_id IN (
                SELECT id FROM teams WHERE game_id = g.id
              )
              WHERE tp.player_id = ? 
              GROUP BY g.id, g.created_at, tp.team_id 
              ORDER BY g.created_at DESC`;

const [response] = await db.query(sql, [id]);
return res.status(200).json(response);


  }catch(error){
    console.log("error : "+error);
    return res.status(200).json({message : "problem retreiving games history"})
  }
  
}

export {getAllGames, getGameById, addGame, score, getGamesHistory}